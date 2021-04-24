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
    const products = [];
    for (const i in cart) {
        const product = [];
        product.push(email, cart[i].product_id, cart[i].title, cart[i].size, cart[i].color, cart[i].price, cart[i].image, cart[i].qty, cart[i].date);
        products.push(product);
    }
    const result = await updateCart(email, products);
    if(result) {
        res.status(200).send({message: 'Update cart sucesses!'});
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