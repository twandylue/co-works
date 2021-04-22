const router = require('express').Router();

router.route('/test').get((req, res) => {
    console.log('test');
    res.send('test');
});

module.exports = router;