const {query, transaction, commit, rollback} = require('./mysqlcon');

const testMySQL = async (req, res) => {
    // console.log('test');
    // trans
    const insert = [['CCCCCC', 'S', 1], ['FFFFFF', 'M', 2], ['FFDDDD', 'M', 3]];
    const qtyList = [];
    const test = {};
    // await query('UPDATE for_test SET stock = 1 WHERE id = 1'); // test
    // test.select = await query('SELECT product_id, stock FROM for_test WHERE (color_code, size, product_id) IN ?', [[insert]]);
    await transaction();
    test.update = await query('UPDATE for_test SET stock = stock - ? WHERE (color_code, size, product_id) IN ?', [[[0]], [insert]]);
    test.select = await query('SELECT product_id, stock FROM for_test WHERE (color_code, size, product_id) IN ?', [[insert]]);
    for (const i in test.select) {
        // console.log(test.select[i].stock);

    }
    await commit();
    // console.log('test');
    // console.log(test);

    // Update
    // awiat SELECT
    // taypay
    // commit or rollback
    res.send('OK');
    return;
};

module.exports = {
    testMySQL
};