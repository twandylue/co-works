const router = require('express').Router();

const {
    getCollectionInfo,
    updateCollecitonInfo
} = require('../controllers/collection_controller');

const {
    wrapAsync,
    authentication
} = require('../../util/util');

router.route('/user/collection').get(authentication(), wrapAsync(getCollectionInfo));

router.route('/user/collection').post(authentication(), wrapAsync(updateCollecitonInfo));

module.exports = router;