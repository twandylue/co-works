const { selectRecommend,
    sendRecommendData,
    profileRecommend,
    searchApi
} = require('../models/recommend_model');


const { getCollection
} = require('../models/collection_model');


const pushRecommend = async (req ,res) => {

    const id = req.query.id;
    const paging = parseInt(req.query.paging) || 0;
    const profile = req.query.profile;
    const pageSize = 6;

    if(profile != null){
        const userEmail = req.user.email;
        console.log(userEmail);
        let collectionData =  await getCollection(userEmail);
        collectionData = JSON.parse(JSON.stringify(collectionData));
        let collectionId = 400;


        if(collectionData[0] !== undefined){

            let collectionId = collectionData[0].product_id;
            if(collectionId == undefined){
                collectionId = 400;
            }
        }

        if(collectionId < 201800000000){
            const result = await profileRecommend(pageSize, paging, collectionId);
            let sort = JSON.parse(JSON.stringify(result));
            const printf = [];


            for(let i=0; i<7; i++){
                const getBackRecommend = await searchApi(sort[i].product_2_id);
                printf.push(getBackRecommend);
            }

            sort = {data: printf};
            if(sort.data[6] !== undefined){
                sort.data.pop();
                sort.next_paging = paging + 1;
            }

            // sort.data.pop();
            res.send(sort);
        }else{
            const result = await selectRecommend(collectionId);
            if(result.data[pageSize*paging + pageSize] !== undefined){
                result.next_paging = paging + 1;
            }
            return res.send(result);
        }





    }else if(id !== null){
        const result = await selectRecommend(id);

        if(+id < 201800000000){
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
            if(result.data[pageSize*paging + pageSize] !== undefined){
                result.next_paging = paging + 1;
            }
            return res.send(result);
        }

    }else{
        return res.send('send id plz....your penis too small');
    }
};

module.exports = {
    pushRecommend
};