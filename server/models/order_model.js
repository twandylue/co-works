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
        const userInfo = await query('SELECT id FROM user WHERE email = ?', [email]);
        const orderList = await query('SELECT `number`, time, product_id, `name`, price, color_code, color_name, size, qty FROM order_list_table WHERE user_email = ? ORDER BY id', [email]);
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
        const rateList = await query('SELECT rating FROM rating_table WHERE user_email = ? AND number in ? AND product_id in ? ORDER BY id', [email, [numberList], [productIdList]]);

        await commit();
        const result = {
            orderList: orderList,
            productMainImageList: productMainImageList,
            rateList: rateList
        };
        return(result);
    } catch (error) {
        // console.log(error);
        await rollback();
        return({error});
    }
};

const updataOrderDetailsTable = async (email, number, time, orderDetails) => { // 需要更正 新增考慮付款狀態 有付款才能做事情 and 可以合併到createPayment中? get修正
    const result = {};
    try {
        await transaction();
        let insertInfo = [number, orderDetails.shipping, orderDetails.payment, orderDetails.subtotal, orderDetails.freight, orderDetails.total, orderDetails.recipient.name, orderDetails.recipient.phone, orderDetails.recipient.email, orderDetails.recipient.address, orderDetails.recipient.time];
        insertInfo = [];
        for (const i in orderDetails.list) {
            const ratingStatus = 0;
            const insert = [number, time, email, orderDetails.list[i].id, orderDetails.list[i].name, orderDetails.list[i].price, orderDetails.list[i].color.code, orderDetails.list[i].color.name, orderDetails.list[i].size, orderDetails.list[i].qty, ratingStatus];
            insertInfo.push(insert);
        }
        result.insertToOrder_details_table = await query('INSERT INTO order_list_table (`number`, time, user_email, product_id, name, price, color_code, color_name, size, qty, rating_status) VALUES ?', [insertInfo]);
        const insertRatingInfo = [email, number, orderDetails.list[i].id, 0];
        result.insrtToRating_table = await query('INSERT INTO rating_table (user_email, `number`, product_id, rating) VALUES ?', [insertRatingInfo]);
        await commit();
    } catch (error) {
        // console.log(error);
        await rollback();
        return {error};
    }
};

module.exports = {
    createOrder,
    createPayment,
    payOrderByPrime,
    getUserPayments,
    getUserPaymentsGroupByDB,
    getOrderInfo,
    updataOrderDetailsTable
};