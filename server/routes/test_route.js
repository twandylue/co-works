const router = require('express').Router();
const {testMySQL} = require('../models/testSQL_model');

// router.route('/test').get((req, res) => {
//     console.log('test');
//     res.send('test'); // 測試使用
// });

router.route('/test').get(testMySQL);

module.exports = router;