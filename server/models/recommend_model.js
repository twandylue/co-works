const {transaction, commit, rollback, query} = require('./mysqlcon');

const selectRecommend = async (productId) =>{
    const command = {mysql:'', id: productId};
    try{

        command.mysql = 'SELECT * FROM title_recommendation WHERE selected_id = ? ';
        const result = await query(command.mysql, command.id);
        return result;
    }catch(error){
        return error;
    }

};


const sendRecommendData = async (productId) =>{
    const command = {mysql:'', id: productId};
    try{
        command.mysql = 'SELECT * FROM crawler_raw_data_table WHERE id = ?';
        const result = await query(command.mysql, command.id);
        const resendData = JSON.parse(JSON.stringify(result));

        // 解決大量的array互相包住。
        return resendData[0];
    }catch(error){
        return error;
    }

};


const profileRecommend = async (pageSize, paging, productId) =>{
    const command = {mysql:'', id: [productId], orderby: ' ORDER BY `similarity` DESC '};

    const limit = {
        sql: 'LIMIT ?, ?',
        binding: [pageSize * paging, pageSize+1]
    };

    try{
        command.mysql = 'similarity_table WHERE product_1_id = ?';
        const profileRecommend = 'SELECT * FROM ' + command.mysql + command.orderby + limit.sql;
        command.id.push(limit.binding[0]);
        command.id.push(limit.binding[1]);
        const result = await query(profileRecommend, command.id);
        return result;
    }catch(error){
        rollback();
        return error;
    }

};


module.exports = {
    selectRecommend,
    sendRecommendData,
    profileRecommend
};