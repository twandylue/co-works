const request = require('request');
const cheerio = require('cheerio');
const {query, transaction, commit, rollback} = require('./mysqlcon');

const updateMySQL = (req, res) => {
    console.log('crawler');
    const raw_list = [];
    const crawler = () => {
        return new Promise((resolve, reject) => {
            request({
                url: 'https://fts-api.91app.com/pythia-cdn/graphql?shopId=35686&lang=zh-TW&query=query%20cms_shopCategory(%24shopId%3A%20Int!%2C%20%24categoryId%3A%20Int!%2C%20%24startIndex%3A%20Int!%2C%20%24fetchCount%3A%20Int!%2C%20%24orderBy%3A%20String%2C%20%24isShowCurator%3A%20Boolean%2C%20%24locationId%3A%20Int)%20%7B%0A%20%20shopCategory(shopId%3A%20%24shopId%2C%20categoryId%3A%20%24categoryId)%20%7B%0A%20%20%20%20salePageList(startIndex%3A%20%24startIndex%2C%20maxCount%3A%20%24fetchCount%2C%20orderBy%3A%20%24orderBy%2C%20isCuratorable%3A%20%24isShowCurator%2C%20locationId%3A%20%24locationId)%20%7B%0A%20%20%20%20%20%20salePageList%20%7B%0A%20%20%20%20%20%20%20%20salePageId%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20picUrl%0A%20%20%20%20%20%20%20%20salePageCode%0A%20%20%20%20%20%20%20%20price%0A%20%20%20%20%20%20%20%20suggestPrice%0A%20%20%20%20%20%20%20%20isFav%0A%20%20%20%20%20%20%20%20isComingSoon%0A%20%20%20%20%20%20%20%20isSoldOut%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20totalSize%0A%20%20%20%20%20%20shopCategoryId%0A%20%20%20%20%20%20shopCategoryName%0A%20%20%20%20%20%20statusDef%0A%20%20%20%20%20%20listModeDef%0A%20%20%20%20%20%20orderByDef%0A%20%20%20%20%20%20dataSource%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=cms_shopCategory&variables=%7B%22shopId%22%3A35686%2C%22categoryId%22%3A0%2C%22startIndex%22%3A0%2C%22fetchCount%22%3A40%2C%22orderBy%22%3A%22%22%2C%22isShowCurator%22%3Afalse%2C%22locationId%22%3A0%7D',
                method: 'GET'
              }, function (error, response, body) {
                  if (error || !body) {
                  return;
              }
              const list = JSON.parse(body).data.shopCategory.salePageList.salePageList; // res.body is json
              for (const i in list) {
                const raw_data = [];
                raw_data.push(list[i].title, list[i].price, list[i].picUrl, 'woman');
                raw_list.push(raw_data);
              }
              resolve(raw_list);
          });
        });
    };
    crawler().then(async (result) => {
        // console.log(result);
        // const ans = await query('INSERT INTO stylish.crawler_raw_data_table (title, price, image, category) VALUES ?', [result]);
        // console.log(ans);
        res.send('CLOSE!');
    });
};

module.exports = { updateMySQL };