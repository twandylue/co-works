const router = require('express').Router();
const {point} = require('../controllers/point_controller');
const util = require('../../util/util');


const {
    wrapAsync,
} = require('../../util/util');


router.route('/point')
    .get(util.authentication(), wrapAsync(point));



module.exports = router;