require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getCart = async (email) => {
    try {
        const result = await query('SELECT product_id, title, size, color, price, image, qty FROM cart WHERE email = ?', [email]);
        return result;
    } catch (error) {
        return {error};
    }
};

const updateCart = async (email, products) => {
    const result = {};
    // console.log(products);
    const id = products.product_id;
    const size = products.size;
    const colorCode = products.color_code;
    try {
        await transaction();

        // result.delete = await query('DELETE FROM cart WHERE email = ?', [email]);
        // if (products.length) {
        //     // console.log(products);
        //     result.insert = await query('INSERT INTO cart (email, product_id, title, size, color, price, image, qty) VALUES ?', [products]);
        // }
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