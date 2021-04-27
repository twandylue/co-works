require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getCart = async (email) => {
    try {
        const result = await query('SELECT product_id, title, size, color_name, color_code, price, image, qty FROM cart WHERE email = ? ORDER BY product_id', [email]);
        if (result.length === 0) {
            return({message: 'Your cart is empty'});
        }
        const insert = [];
        for (const i in result) {
            const info = [result[i].product_id, result[i].color_code, result[i].size];
            insert.push(info);
        }
        const stock = await query('SELECT stock FROM variant WHERE (product_id, color_code, size) IN ?', [[insert]]);
        console.log(insert);
        if (stock.length === 0) { // for test
            return({message: '有問題 加入購物車時size color組合出錯，找不到該項商品。 請在購物車中刪除該項商品後 重新加入正確狀態(組合)的商品。'});
        }
        for (const i in result) {
            result[i].stock = stock[i].stock;
        }
        return result;
    } catch (error) {
        console.log(error);
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