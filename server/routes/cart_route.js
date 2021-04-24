const router = require('express').Router();

const {
    getCartInfo,
    updateCartInfo
} = require('../controllers/cart_controller');

const {
    wrapAsync,
    authentication
} = require('../../util/util');

router.route('/user/cart').get(authentication(), wrapAsync(getCartInfo));

router.route('/user/cart').post(authentication(), wrapAsync(updateCartInfo));

module.exports = router;