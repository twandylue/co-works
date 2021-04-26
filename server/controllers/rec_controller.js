require('dotenv').config();
const {query, transaction, commit, rollback} = require('../models/mysqlcon');


const getrec = async (req, res) => {
    try {
        const result = await query('SELECT * FROM title_recommendation');

        let sort = result[0].recommend_id;
        console.log(sort.length);
        console.log(typeof(sort));
        // sort = JSON.parse(sort);
        // sort = sort.substring(0,sort.length-1);
        // sort = sort.substring(0,sort.length-1);
        // sort = sort.substr(2);
        // const sort2 = JSON.parse(sort);
        // console.log(sort);
        // sort = sort.stringObject.substr(1).substring(-1,0);
        sort = JSON.parse(sort);

        return res.send(sort);
    } catch (error) {
        return {error};
    }
};



module.exports = {
    getrec
};
