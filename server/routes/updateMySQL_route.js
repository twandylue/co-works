const router = require('express').Router();

const {updateMySQL} = require('../models/updateMySQL_model');
const {updloadFakeData} = require('../models/fakeData_model');

// router.route('/crawler').get(updateMySQL);

router.route('/fakeData').get(updloadFakeData);

module.exports = router;