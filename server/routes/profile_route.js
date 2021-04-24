const router = require('express').Router();

const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {getUserInfo} = require('../controllers/profile_controller');

router.route('/user/profileInfo').get(authentication(), wrapAsync(getUserInfo));

module.exports = router;