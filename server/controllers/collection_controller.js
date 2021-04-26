require('dotenv').config();
const {getCollection, updateCollection} = require('../models/collection_model');

const getCollectionInfo = async (req, res) => {
    const data = req.user;
    const email = data.email;
    const result = await getCollection(email);
    const response = {
        data:{
            collectionList: result
        }
    };
    if (result) {
        res.status(200).send(response);
        return;
    } else {
        res.status(500).send({error: 'Database Query Error'});
        return;
    }
};

const updateCollecitonInfo = async (req, res) => {
    const collectionItem = req.body.data.collectionItem;
    const email = req.user.email;
    const result = await updateCollection(email, collectionItem);
    console.log(result);
    if (result.affectedRows !== 0) {
        res.status(200).send({message: 'Update collection list sucesses!'});
        return;
    } else {
        res.status(500).send({message: 'Database Query Error.'});
        return;
    }
};

module.exports = {
    getCollectionInfo,
    updateCollecitonInfo
};