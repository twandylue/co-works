const router = require('express').Router();
const {wrapAsync, getUserInfobyToken} = require('../../util/util');

const {
    getCampaigns,
    getHots
} = require('../controllers/marketing_controller');

const {
    getCollection
} = require('../controllers/product_controller');

router.route('/marketing/campaigns')
    .get(wrapAsync(getCampaigns));

router.route('/marketing/hots')
    .get(getUserInfobyToken(), wrapAsync(getCollection), wrapAsync(getHots));

module.exports = router;