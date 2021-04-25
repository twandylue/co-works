const router = require('express').Router();
const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {
    checkout,
    getOrderHistory,
    getUserPayments,
    getUserPaymentsGroupByDB,
} = require('../controllers/order_controller');

const {
    USER_ROLE
} = require('../models/user_model');

router.route('/order/checkout').post(authentication(USER_ROLE.ALL), wrapAsync(checkout)); // 要改 ratingStatus = 0

router.route('/order/checkout').get(authentication(USER_ROLE.ALL), wrapAsync(getOrderHistory)); // 要改 ratingStatus

// For load testing (Not in API Docs)
router.route('/order/payments')
    .get(wrapAsync(getUserPayments));

router.route('/order/payments2')
    .get(wrapAsync(getUserPaymentsGroupByDB));

module.exports = router;