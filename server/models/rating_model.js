require('dotenv').config();
const {query, transaction, commit, rollback, format} = require('./mysqlcon');

const updateRatingList = async (email, ratingItem) => {
    const number = ratingItem.number;
    const product_id = ratingItem.product_id;
    const rating = ratingItem.rating;
    const result = {};
    try {
        await transaction();
        result.select = await query('SELECT rating FROM rating_table WHERE user_email =  ? AND `number` = ? AND product_id = ?', [email, number, product_id]);
        if (result.select[0].rating === 0) {
            result.update = await query('UPDATE rating_table SET rating = ? WHERE user_email =  ? AND `number` = ? AND product_id = ?', [rating, email, number, product_id]);
        }
        await commit();
        return(result);
    } catch (error) {
        console.log(error);
        await rollback();
        return {error};
    }
};

const updateProductRating = async (ratingItem) => {
    console.log(ratingItem);
    const result = {};
    const ans = await query('SELECT rating FROM rating_table WHERE product_id = ?', [ratingItem.product_id]);
    let totalRating = 0;
    for (const i in ans) {
        totalRating += ans[i].rating;
    }
    let avgRating = totalRating/ans.length;
    result.update = await query('UPDATE product SET rating = ? WHERE id = ?', [avgRating, ratingItem.product_id]);
    return(result);
};

module.exports = {
    updateRatingList,
    updateProductRating
};