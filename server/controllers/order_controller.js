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
    // ---race condition
    // const status = await Order.checkStock(data.order); // not finished
    // if (status.length !== 0) {
    //     // console.log(status);
    //     res.status(500).send({message: status});
    //     return;
    // }
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
    // paymentResult = 'test';
    const payment = {
        order_id: orderId,
        details: validator.blacklist(JSON.stringify(paymentResult), '<>')
    };
    // decrease points
    await Order.updateOrderDetailsTable(req.user.email, number, orderRecord.time, data.order); // for test
    await Order.createPayment(payment);
    await Order.clearCart(req.user.email);
    // ---減少product stock
    res.send({data: {number}});
};

const getOrderHistory = async (req, res) => {
    const email = req.user.email;
    const orderHistory = await Order.getOrderInfo(email);
    const orderHistoryList = [];
    for (const i in orderHistory.orderList) {
        for (const j in orderHistory.productMainImageList) {
            if (orderHistory.orderList[i].product_id === orderHistory.productMainImageList[j].id) {
                orderHistory.orderList[i].main_image = orderHistory.productMainImageList[j].main_image;
            }
        }
        const combine = Object.assign(orderHistory.orderList[i], orderHistory.ratingList[i]);
        orderHistoryList.push(combine);
    }
    const response = {
        data: {
            orderHistoryList
        }
    };

    if (orderHistory === 0) {
        // res.status(500).send({message: 'Your order list is empty.'});
        res.status(500).send(response);
        return;
    } else if (orderHistoryList.length) {
        res.status(200).send(response);
        return;
    } else {
        res.status(500).send({error: 'Database Query Error.'});
        return;
    }
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
    getOrderHistory,
    getUserPayments,
    getUserPaymentsGroupByDB
};