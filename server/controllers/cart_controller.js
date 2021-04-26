require('dotenv').config();
const {getCart, updateCart} = require('../models/cart_model');

const getCartInfo = async (req, res) => {
    const data = req.user;
    const email = data.email;
    const result = await getCart(email);
    const response = {
        data: {
            cart: result
        }
    };
    if (result) {
        res.status(200).send(response);
        return;
    } else {
        res.status(500).send({error: 'Database Query Error.'});
        return;
    }
};

const updateCartInfo = async (req, res) => {
    const cart = req.body.data.cart;
    const email = req.user.email;
    const result = await updateCart(email, cart);
    if(result.message) {
        res.status(200).send(result);
        return;
    } else {
        res.status(500).send({error: 'Database Query Error.'});
        return;
    }
};

module.exports = {
    getCartInfo,
    updateCartInfo
};