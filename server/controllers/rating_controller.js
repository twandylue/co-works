require('dotenv').config();
const {updateRatingList, updateProductRating} = require('../models/rating_model');

const updateRatingTable = async (req, res, next) => {
    const ratingItem = req.body.data.ratingItem;
    const email = req.user.email;
    const resStatus = await updateRatingList(email, ratingItem);
    if (resStatus === 1) {
        next();
        return;
    } else if (resStatus === 0) {
        // res.status(500).send({error: 'Database Query Error'});
        console.log('Wrong number or product_id in your ratingItem. There is no match data in database.'); // for test
        res.status(500).send({message: 'Wrong number or product_id in your ratingItem. There is no match data in database.'});
        return;
    }
};

const updateProductRatingTable = async (req, res) => {
    const ratingItem = req.body.data.ratingItem;
    const result = await updateProductRating(ratingItem);
    if (result.update.affectedRows) {
        res.status(200).send({message: 'Update rating sucesses!'});
        return;
    } else {
        res.status(500).send({error: 'Database Query Error.'});
        return;
    }
};

module.exports = {
    updateRatingTable,
    updateProductRatingTable
};