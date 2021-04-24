require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getCart = async (email) => {
    try {
        const result = await query('SELECT * FROM cart WHERE email = ?', [email]);
        return result;
    } catch (error) {
        return {error};
    }
};

const updateCart = async (email, products) => {
    const result = {};
    try {
        await transaction();
        result.delete = await query('DELETE FROM cart WHERE email = ?', [email]);
        result.insert = await query('INSERT INTO cart (email, product_id, title, size, color, price, image, qty, date) VALUES ?', [products]);
        await commit();
        return(result);
    } catch(error) {
        await rollback();
        return {error};
    }
};

module.exports = {
    getCart,
    updateCart
};