/* eslint-disable no-unused-vars */
require('dotenv').config();
const {query, end} = require('../server/models/mysqlcon');
const {getTotalOrders} = require('./load_test_data');
const totalOrders = getTotalOrders();
const {Generator, beta_trans} = require('./random_number_generator');
const user_id_generator = new Generator(5, beta_trans);

function _createFakeOrder(orders) {
    return query('INSERT INTO order_table (user_id, number, time, status, details, total) VALUES ?',
        [orders.map((x, i) => ([
            1 + user_id_generator.generate(),
            i,
            Date.now(),
            0,
            JSON.stringify(x),
            x.total,
        ]))]
    );
}

async function createFakeData() {
    let i = 0;
    while (i < totalOrders.length) {
        let j = 0;
        let orders = [];
        while (j < Math.min(10000, totalOrders.length)){
            orders.push(totalOrders[i+j]);
            j += 1;
        }
        i += j;
        await _createFakeOrder(orders);
    }
}

function truncateFakeData() {
    console.log('truncate fake data');
    const setForeignKey = (status) => {
        return query('SET FOREIGN_KEY_CHECKS = ?', status);
    };

    const truncateTable = (table) => {
        return query(`TRUNCATE TABLE ${table}`);
    };

    return setForeignKey(0)
        .then(truncateTable('order_table'))
        .catch(console.log);
}

function closeConnection() {
    return end();
}

// execute when called directly.
if (require.main === module) {
    console.log('main');
    truncateFakeData()
        .then(createFakeData)
        .then(closeConnection);
}

module.exports = {
    createFakeData,
    truncateFakeData,
    closeConnection,
};