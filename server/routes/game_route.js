const router = require('express').Router();
const {playGame} = require('../controllers/game_controller');
const util = require('../../util/util');


const {
    wrapAsync,
} = require('../../util/util');


router.route('/game')
    .get(wrapAsync(playGame));



module.exports = router;