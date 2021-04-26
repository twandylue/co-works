const router = require('express').Router();
const {wrapAsync, getUserInfobyToken} = require('../../util/util');

const {
    getProducts,
    getCollection
} = require('../controllers/product_controller');

router.route('/products/:category')
    .get(getUserInfobyToken(), wrapAsync(getCollection), wrapAsync(getProducts));

module.exports = router;
