require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getCart = async (email) => {
    try {
        const result = await query('SELECT product_id, title, size, color_name, color_code, price, image, qty FROM cart WHERE email = ?', [email]);
        return result;
    } catch (error) {
        return {error};
    }
};

const updateCart = async (email, products) => {
    const id = products.product_id;
    const size = products.size;
    const colorCode = products.color_code;
    const qty = products.qty;
    if (qty === 0) {
        await query('DELETE FROM cart WHERE email = ? AND product_id = ? AND size = ? AND color_code = ?', [email, id, size, colorCode]);
        return {message: 'Remove product from your cart.'};
    }
    try {
        await transaction();
        const cartItem = await query('SELECT * FROM cart WHERE email = ? AND product_id = ? AND size = ? AND color_code = ?', [email, id, size, colorCode]);
        if (cartItem.length !== 0) {
            await query('DELETE FROM cart WHERE email = ? AND product_id = ? AND size = ? AND color_code = ?', [email, id, size, colorCode]);
        }
        const insertInfo = [email, id, products.title, size, products.color_name, colorCode, products.price, products.image, products.qty];
        await query('INSERT INTO cart (email, product_id, title, size, color_name, color_code, price, image, qty) VALUES ?', [[insertInfo]]);
        await commit();
        return {message: 'Update items in your cart.'};
    } catch(error) {
        await rollback();
        return {error};
    }
};

module.exports = {
    getCart,
    updateCart
};