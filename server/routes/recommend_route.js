const router = require('express').Router();

const {
    wrapAsync,
} = require('../../util/util');

const {
    getrec
} = require('../controllers/rec_controller');

router.route('/rec')
    .get(wrapAsync(getrec));

module.exports = router;



