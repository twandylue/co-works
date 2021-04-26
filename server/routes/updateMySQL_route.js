const router = require('express').Router();

const {updateMySQL} = require('../models/updateMySQL_model');

router.route('/crawler').get(updateMySQL);

module.exports = router;