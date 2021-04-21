require('dotenv').config();
const validator = require('validator');
const {TAPPAY_PARTNER_KEY} = process.env;
const Order = require('../models/order_model');

const checkout = async (req, res) => {
    const data = req.body;
	if (!data.order || !data.order.total || !data.order.list || !data.prime) {
        res.status(400).send({error:'Create Order Error: Wrong Data Format'});
		return;
	}
    const user = req.user;
    const now = new Date();
    const number = '' + now.getMonth() + now.getDate() + (now.getTime()%(24*60*60*1000)) + Math.floor(Math.random()*10);
    const orderRecord = {
        number: number,
        time: now.getTime(),
        status: -1, // -1 for init (not pay yet)
        total: data.order.total,
        details: validator.blacklist(JSON.stringify(data.order), '<>')
    };
    orderRecord.user_id = (user && user.id) ? user.id : null;
    const orderId = await Order.createOrder(orderRecord);
    let paymentResult;
    try {
        paymentResult = await Order.payOrderByPrime(TAPPAY_PARTNER_KEY, data.prime, data.order);
        if (paymentResult.status != 0) {
            res.status(400).send({error: 'Invalid prime'});
            return;
        }
    } catch (error) {
        res.status(400).send({error});
        return;
    }
    const payment = {
        order_id: orderId,
        details: validator.blacklist(JSON.stringify(paymentResult), '<>')
    };
    await Order.createPayment(payment);
    res.send({data: {number}});
};

// For Load Testing
const getUserPayments = async (req, res) => {
    const orders = await Order.getUserPayments();
    const user_payments = orders.reduce((obj, order) => {
        let user_id = order.user_id;
        if (!(user_id in obj)) {
            obj[user_id] = 0;
        }
        obj[user_id] += order.total;
        return obj;
    }, {});
    const user_payments_data = Object.keys(user_payments).map(user_id => {
        return {
            user_id: parseInt(user_id),
            total_payment: user_payments[user_id]
        };
    });
    res.status(200).send({data: user_payments_data});
};

const getUserPaymentsGroupByDB = async (req, res) => {
    const orders = await Order.getUserPaymentsGroupByDB();
    res.status(200).send({data: orders});
};

module.exports = {
    checkout,
    getUserPayments,
    getUserPaymentsGroupByDB
};