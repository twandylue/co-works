const {transaction, commit, rollback, query} = require('./mysqlcon');

const selectRecommend = async (productId) =>{
    const command = {mysql:'', id: productId};

    try {

    } catch (error) {
        console.log(error);
        return error;
    }

};


module.exports = {
    selectRecommend,
    sendRecommendData,
    profileRecommend,
    searchApi
};