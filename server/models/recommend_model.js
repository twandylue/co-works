const {transaction, commit, rollback, query} = require('./mysqlcon');

const selectRecommend = async (productId) =>{
    const command = {mysql:'', id: productId};

    try{

        if(+command.id > 201800000000){
            // 這裡會拿取所有的 array， about stylish 的商品id
            command.mysql = 'SELECT id, title, category, price, main_image FROM product WHERE id >= 201800000000 AND  id != ?';
            const result = await query(command.mysql, command.id);

            let sort = JSON.parse(JSON.stringify(result));

            let printf = {data:[]};
            for(let num = 0; num < sort.length; num++){
                // 推薦商品不包含自己
                if(sort[num].id !== command.id){
                    // 將資料組裝
                    const data = {
                        id: sort[num].id,
                        title: sort[num].title,
                        price: +sort[num].price,
                        image: sort[num].main_image,
                        category: sort[num].category
                    };

                    // 將資料組裝

                    printf.data.push(data);
                }
            }
            printf.data = printf.data.sort(() => Math.random() - 0.5);

            console.log(printf);
            return printf;

        }else{

            // 這邊會拿「一個」array，裡面的 「recommend_id」包含所有推薦商品
            command.mysql = 'SELECT * FROM title_recommendation WHERE selected_id = ? ';
            const result = await query(command.mysql, command.id);
            console.log(result);
            return result;
        }

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

const searchApi = async(id) => {
    const command = {mysql:'', id: [id]};
    command.mysql = 'SELECT * FROM crawler_raw_data_table WHERE id = ?';
    try {

        const result = await query(command.mysql, command.id);
        const printf = result[0];
        return printf;

    } catch (error) {
        return error;
    }

};


module.exports = {
    selectRecommend,
    sendRecommendData,
    profileRecommend,
    searchApi
};