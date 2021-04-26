require('dotenv').config();
const {updateRatingList, updateProductRating} = require('../models/rating_model');

const updateRatingTable = async (req, res, next) => {
    const ratingList = req.body.data.ratingList;
    const email = req.user.email;
    const RatingListArr = [];
    for(const i in ratingList) {
        const ratingInfo = [];
        ratingInfo.push(email, ratingList[i].product_id, ratingList[i].rating);
        RatingListArr.push(ratingInfo);
    }

    // const result = await updateRatingList(email, RatingListArr);
    // if (result) {
    //     res.status(200).send(result);
    //     next();
    //     // return;
    // } else {
    //     res.status(500).send({error: 'Database Query Error'});
    //     // next();
    //     return;
    // }
    console.log('test1');
    next();
};

const updateProductRatingTable = async (req, res) => {
    const ratingList = req.body.data.ratingList;
    const RatingListArr = [];
    for(const i in ratingList) {
        const ratingInfo = [];
        ratingInfo.push(ratingList[i].product_id, ratingList[i].rating);
        RatingListArr.push(ratingInfo);
    }
    // console.log(RatingListArr);
    const result = await updateProductRating(RatingListArr);
    console.log(result);
    console.log('test2');
};

module.exports = {
    updateRatingTable,
    updateProductRatingTable
};