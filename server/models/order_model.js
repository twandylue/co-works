const {query, transaction, commit, rollback} = require('./mysqlcon');
const got = require('got');

const createOrder = async (order) => {
    const result = await query('INSERT INTO order_table SET ?', order);
    return result.insertId;
};

const createPayment = async function(payment){
    try {
        await transaction();
        await query('INSERT INTO payment SET ?', payment);
        await query('UPDATE order_table SET status = ?', [0]);
        await commit();
        return true;
    } catch (error) {
        await rollback();
        return {error};
    }
};

const payOrderByPrime = async function(tappayKey, prime, order){
    let res = await got.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', {
        headers: {
            'Content-Type':'application/json',
            'x-api-key': tappayKey
        },
        json: {
            'prime': prime,
            'partner_key': tappayKey,
            'merchant_id': 'AppWorksSchool_CTBC',
            'details': 'Stylish Payment',
            'amount': order.total,
            'cardholder': {
                'phone_number': order.recipient.phone,
                'name': order.recipient.name,
                'email': order.recipient.email
            },
            'remember': false
        },
        responseType: 'json'
    });
    return res.body;
};

const getUserPayments = async () => {
    const orders = await query('SELECT user_id, total FROM order_table');
    return orders;
};

const getUserPaymentsGroupByDB = async () => {
    const orders = await query('SELECT user_id, SUM(total) as total_payment FROM order_table GROUP BY user_id');
    return orders;
};

const getOrderInfo = async (email) => {
    try {
        await transaction();
        // const orderList = await query('SELECT `number`, time, product_id, `name`, price, color_code, color_name, size, qty FROM order_list_table WHERE user_email = ? ORDER BY id', [email]);
        const orderList = await query('SELECT `number`, time, product_id, `name`, price, color_code, color_name, size, qty FROM order_list_table WHERE user_email = ? ORDER BY product_id', [email]);
        if (orderList.length === 0) {
            return(0);
        }
        const productIdList = [];
        const numberList = [];
        for (const i in orderList) {
            productIdList.push(orderList[i].product_id);
            numberList.push(orderList[i].number);
        }

        const productMainImageList = await query('SELECT id, main_image FROM product WHERE id in ? ORDER BY id', [[productIdList]]);
        // const ratingList = await query('SELECT rating FROM rating_table WHERE user_email = ? AND number in ? AND product_id in ? ORDER BY id', [email, [numberList], [productIdList]]);
        const ratingList = await query('SELECT rating FROM rating_table WHERE user_email = ? AND number in ? AND product_id in ? ORDER BY product_id', [email, [numberList], [productIdList]]);

        await commit();
        const result = {
            orderList: orderList,
            productMainImageList: productMainImageList,
            ratingList: ratingList
        };
        return(result);
    } catch (error) {
        console.log(error);
        await rollback();
        return({error});
    }
};

const updateOrderDetailsTable = async (email, number, time, order) => {
    const result = {};
    try {
        await transaction();
        let insertInfo = [];
        let insertRatingInfo = [];
        for (const i in order.list) {
            const ratingStatus = 0;
            const insert = [number, time, email, order.list[i].id, order.list[i].name, order.list[i].price, order.list[i].color.code, order.list[i].color.name, order.list[i].size, order.list[i].qty, ratingStatus];
            const insertRating = [email, number, order.list[i].id, ratingStatus];
            insertInfo.push(insert);
            insertRatingInfo.push(insertRating);
        }
        result.insertToOrder_details_table = await query('INSERT INTO order_list_table (`number`, time, user_email, product_id, name, price, color_code, color_name, size, qty, rating_status) VALUES ?', [insertInfo]);
        result.insrtToRating_table = await query('INSERT INTO rating_table (user_email, `number`, product_id, rating) VALUES ?', [insertRatingInfo]);
        await commit();
        console.log('in order_updataOrderDetailsTable():------');
        console.log(result);
        return;
    } catch (error) {
        console.log(error);
        await rollback();
        return {error};
    }
};

const clearCart = async (email) => {
    await query('DELETE FROM cart WHERE email = ?', [email]);
    return;
};

const checkStock = async (order) => {
    const infoList = [];
    for (const i in order.list) {
    const info = [order.list[i].id, order.list[i].color.code, order.list[i].size];
    infoList.push(info);
    }
    const stockList = await query('SELECT product_id, stock FROM variant WHERE (product_id, color_code, size) IN ?', [[infoList]]);
    // console.log(stockList);
    const Status = [];
    for (const i in stockList) {
        if (order.list[i].qty > stockList[i].stock) {
            const message = {
                name: order.list[i].name,
                size: order.list[i].size,
                colorName: order.list[i].color.name,
                condition: 'qty over stock',
            };
            Status.push(message);
        }
    }
    if (Status.length) {
        // console.log(Status);
        return(Status);
    } else {
        return([]);
    }
};

module.exports = {
    createOrder,
    createPayment,
    payOrderByPrime,
    getUserPayments,
    getUserPaymentsGroupByDB,
    getOrderInfo,
    updateOrderDetailsTable,
    clearCart,
    checkStock
};