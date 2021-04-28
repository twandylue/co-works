const router = require('express').Router();
const {pushRecommend} = require('../controllers/recommend_controller');
const util = require('../../util/util');


const {
    wrapAsync,
} = require('../../util/util');

router.route('/recommend')
    .get(wrapAsync(pushRecommend));

router.route('/profile_recommend')
    .get(util.authentication(), wrapAsync(pushRecommend));



module.exports = router;