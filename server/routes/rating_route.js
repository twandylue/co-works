const router = require('express').Router();

const {updateRatingTable, updateProductRatingTable} = require('../controllers/rating_controller');

const {
    wrapAsync,
    authentication
} = require('../../util/util');

router.route('/user/rating').post(authentication(), wrapAsync(updateRatingTable), wrapAsync(updateProductRatingTable));

module.exports = router;
