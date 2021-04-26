require('dotenv').config();
const {query, transaction, commit, rollback, format} = require('./mysqlcon');

const updateRatingList = async (email, ratingList) => { // 待改
    const result = {};
    try {
        await transaction();
        // result.delete = await query('DELETE FROM rating_table WHERE user_email = ?', [email]);
        result.insert = await query('INSERT INTO rating_table (user_email, product_id, rating) VALUES ?', [ratingList]);
        await commit();
        return(result);
    } catch (error) {
        await rollback();
        return {error};
    }
};

const updateProductRating = async (RatingListArr) => {
    // console.log(RatingListArr);
    const result = {};
    const updateMessage = [];
    const queryArr = [];
    const idList = [];
    const ratingList = [];
    for (const i in RatingListArr) {
        try {
            let ratingSum = 0;
            let ratingAvg = 0;
            const id = RatingListArr[i][0];
            // const rating = RatingListArr[i][1];
            const ratingArr = await query('SELECT rating FROM rating_table WHERE product_id = ?', [id]);
            for (const j in ratingArr) {
                ratingSum += ratingArr[j].rating;
            }
            ratingAvg = ratingSum/ratingArr.length;
            // queryArr.push([id, ratingAvg]);
            // idList.push(id);
            // ratingList.push(ratingAvg);
            updateMessage.push(await query('UPDATE product SET rating = ? WHERE id = ?', [ratingAvg, id]));
        } catch (error) {
            await rollback();
            return({error});
        }
    }
    result.updata = updateMessage;
    return(result);

    // console.log([ratingList, idList]);

    // var values = [
    //     { users: 'tom', id: 101 },
    //     { users: 'george', id: 102 }
    // ];
    // var queries = '';
    // // const name = ['tom', 'george'];
    // // const id = [101, 102];
    // // const item = [name, id];
    // // queries = await format('UPDATE tabletest SET users = ? WHERE id = ?; ', item);
    // // console.log(queries);

    // values.forEach(async function (item) {
    //     queries += await format('UPDATE tabletest SET users = ? WHERE id = ?; ', item);
    //     // console.log(queries);
    // });

    // console.log(values);

    // try {
    //     result.update = await query('UPDATE product SET rating = ? WHERE id = ?', [ratingList, idList]);
    //     return(result);
    // }
    // catch (error) {
    //     return {error};
    // }


    //     // result.update = await query('UPDATE product SET rating = ? WHERE id = ?', [ratingAvg, id]);

};

module.exports = {
    updateRatingList,
    updateProductRating
};