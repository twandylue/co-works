require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getCollection = async (email) => {
    try {
        const result = await query('SELECT product_id, title, price, image, status FROM collection WHERE email = ?', [email]);
        return result;
    } catch (error) {
        return({error});
    }
};

const updateCollection = async (email, collectionItem) => {
    const result = {};
    if (collectionItem.status === 1) {
        try {
            await transaction();
            // result.delete = await query('DELETE FROM collection WHERE email = ?', [email]); // for insurance
            const insertInfo = [email, collectionItem.title, collectionItem.product_id, collectionItem.price, collectionItem.image, collectionItem.status];
            result.insert = await query('INSERT INTO collection (email, title, product_id, price, image, `status`) VALUES ?', [[insertInfo]]);
            await commit();
            result.status = 1;
            return(result);
        } catch (error) {
            await rollback();
            return {error};
        }
    } else if (collectionItem.status === 0) {
        try {
            result.delete = await query('DELETE FROM collection WHERE email = ? AND product_id = ?', [email, collectionItem.product_id]);
            result.status = 1;
        } catch (error) {
            return {error};
        }
    }
    return(result);
};

module.exports = {
    getCollection,
    updateCollection
};