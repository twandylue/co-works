const { json } = require('express');
const { UnsupportedProtocolError } = require('got/dist/source');
const {query, transaction, commit, rollback} = require('./mysqlcon');

const updloadFakeData = async (req, res) => {
    // const loadRawData = await query('SELECT * FROM crawler_raw_data_table');
    // const a = JSON.parse(JSON.stringify(loadRawData));
    // // console.log(a[0]);
    // const insertProduct = [];
    // const insertVariant = [];
    // // console.log(a);
    // for (const i in a) {
    //     const description = '厚薄：薄\n彈性：無';
    //     const texture = '棉 100%';
    //     const wash = '手洗';
    //     const place = '台灣';
    //     const note = '實品顏色依單品照為主';
    //     const story = 'O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.';
    //     const images = a[i].image + '|' + a[i].image + '|' + a[i].image;
    //     // const images = a[i].image;
    //     const rating = 0;
    //     const price = getPurePrice(a[i].price);
    //     const info = [a[i].id, a[i].category, a[i].title, description, price, texture, wash, place, note, story, a[i].image, images, rating];
    //     insertProduct.push(info);

    //     const colors = [{code: 'FFFFFF', name: '白色'}, {code: 'DDFFBB', name: '亮綠'}, {code: 'CCCCCC', name: '淺灰'}, {code: 'DDF0FF', name: '淺藍'}, {code: '334455', name: '深藍'}, {code: 'BB7744', name: '淺棕'}, {code: 'FFDDDD', name: '粉紅'}];
    //     const sizes = ['S', 'M', 'L', 'XL'];

    //     const randomNum = Math.floor(Math.random()* 4) + 1;

    //     const useColor = [];

    //     // console.log(i+'thing');
    //     for(let num = 0; num < randomNum; num++){
    //         // 獲得隨機的顏色

    //         const randomColor = Math.floor(Math.random() * colors.length);
    //         const getColor = colors[randomColor];
    //         let repeat = 0;

    //         // 檢查顏色是否有重複
    //         for(let i=0; i<useColor.length; i++){
    //             if(useColor[i].name === getColor.name){
    //                 repeat = 1;
    //             }
    //         }

    //         // 如果沒有重複，尋找隨機的Size
    //         if(repeat === 0){
    //             // 將剛剛獲得的顏色，列入以使用的清單
    //             useColor.push(getColor);
    //             const useSize = [];
    //             const randomSizeNumber = Math.floor(Math.random()*3)+1;

    //             for(let ber = 0; ber < randomSizeNumber; ber++){
    //                 // 獲得隨機的Size
    //                 const randomSize = Math.floor(Math.random()*4);
    //                 const getSize = sizes[randomSize];
    //                 let sizeRepeat = 0;

    //                 // 檢查是否有重複的size
    //                 for(let sizNum = 0; sizNum < useSize.length; sizNum++){
    //                     // 如果重複，就跳下一個run。
    //                     if(getSize === useSize[sizNum]){
    //                         sizeRepeat = 1;
    //                     }
    //                 }

    //                 // 如果沒有重複
    //                 if(sizeRepeat === 0){
    //                     useSize.push(getSize);
    //                     const stock = Math.floor(Math.random() * 999);
    //                     const pushData = [getColor.code, getColor.name, getSize, stock, a[i].id];
    //                     insertVariant.push(pushData);
    //                 }
    //             }
    //         }else{
    //             // console.log('repeat and skip');
    //         }
    //     }
    //     // insertVariant.push();
    // }
    // // console.log(insertProduct[237]);
    // // console.log(insertVariant);
    // try {
    //     // await query('INSERT INTO product (id, category, title, description, price, texture, wash, place, note, story, main_image, images, rating) VALUES ?', [insertProduct]);
    //     // await query('INSERT INTO variant (color_code, color_name, size, stock, product_id) VALUES ?', [insertVariant]);
    //     // console.log('test');
    // } catch (err) {
    //     console.log(err);
    // }
    res.send('fake data');
    return;
};

function getPurePrice(price) {
    const newPrice = price.replace(/,/g, '');
    return parseInt(newPrice);
}

module.exports = {
    updloadFakeData
};