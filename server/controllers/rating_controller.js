require('dotenv').config();
const {updateRatingList, updateProductRating} = require('../models/rating_model');

const updateRatingTable = async (req, res, next) => {
    const ratingItem = req.body.data.ratingItem;
    const email = req.user.email;
    const result = await updateRatingList(email, ratingItem);
    if (result.select.length) {
        next();
        return;
    } else {
        res.status(500).send({error: 'Database Query Error'});
        // next();
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