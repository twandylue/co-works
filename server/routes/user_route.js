const router = require('express').Router();

const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {
    signUp,
    signIn,
    getUserProfile,
} = require('../controllers/user_controller');

const {
    getOrderHistory,
} = require('../controllers/order_controller');

const {
    USER_ROLE
} = require('../models/user_model');

router.route('/user/signup')
    .post(wrapAsync(signUp));

router.route('/user/signin')
    .post(wrapAsync(signIn));

router.route('/user/profile')
    .get(authentication(), wrapAsync(getUserProfile));

router.route('/user/orderhistory').get(authentication(USER_ROLE.ALL), wrapAsync(getOrderHistory));

module.exports = router;