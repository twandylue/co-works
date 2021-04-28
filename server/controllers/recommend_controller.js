const { selectRecommend,
    sendRecommendData,
    profileRecommend
} = require('../models/recommend_model');


const { getCollection
} = require('../models/collection_model');


const pushRecommend = async (req ,res) => {

    const id = req.query.id;
    const paging = parseInt(req.query.paging) || 0;
    const profile = req.query.profile;
    const pageSize = 6;


    // console.log(collectionData);


    if(profile != null){
        const userEmail = req.user.email;
        let collectionData =  await getCollection(userEmail);
        collectionData = JSON.parse(JSON.stringify(collectionData));

        let collectionId = collectionData[0].product_id;
        if(collectionId == undefined){
            collectionId = 400;
        }

        const result = await profileRecommend(pageSize, paging, collectionId);
        let sort = JSON.parse(JSON.stringify(result));

        sort = {data: sort};
        if(sort.data[6] !== undefined){
            sort.data.pop();
            sort.next_paging = paging + 1;
        }

        // sort.data.pop();
        res.send(sort);

    }else if(id !== null){
        const result = await selectRecommend(id);
        let sort = JSON.parse(JSON.stringify(result));
        sort = JSON.parse(sort[0].recommend_id);
        //調整商品的相似度，由高到低。
        sort = sort.data.sort((a, b) => {
            //邏輯炸裂！
            return a.similarity*-1 - b.similarity*-1;
        });


        const allRecommendProduct = [];
        let skipNum = 0;

        for(let num = 0; num < sort.length-1; num++){
            // 跳過
            if(+sort[num].id === +req.query.id || +sort[num].similarity >= 0.8){
                skipNum += 1;
            }else{
                const recommendData = await sendRecommendData(sort[num].id);
                allRecommendProduct[num] = recommendData;
            }
        }
        const newdata = allRecommendProduct.sort();
        for(let num =0; num < skipNum; num++){
            newdata.pop();
        }


        sort = [];
        for(let i = pageSize * paging; i < (pageSize*paging)+pageSize; i++){
            if(newdata[i] !== undefined){
                sort.push(newdata[i]);
            }else{
                break;
            }
        }
        sort = {data: sort};

        if(newdata[(pageSize*paging)+pageSize] !== undefined){
            sort.next_paging = paging + 1;
        }

        return res.send(sort);
    }else{
        return res.send('send id plz....your penis too small');
    }
};

module.exports = {
    pushRecommend
};