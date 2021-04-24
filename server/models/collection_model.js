require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getCollection = async (email) => {
    try {
        const result = await query('SELECT * FROM collection WHERE email = ?', [email]);
        return result;
    } catch (error) {
        return({error});
    }
};

const updateCollection = async (email, collections) => {
    const result = {};
    try {
        await transaction();
        result.delete = await query('DELETE FROM collection WHERE email = ?', [email]);
        result.insert = await query('INSERT INTO collection (email, title, product_id, price, image) VALUES ?', [collections]);
        await commit();
        return(result);
    } catch (error) {
        await rollback();
        return {error};
    }
};

module.exports = {
    getCollection,
    updateCollection
};