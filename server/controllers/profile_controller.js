require('dotenv').config();
const {getUserProfileInfo} = require('../models/profile_model');

const getUserInfo = async (req, res) => {
    const data = req.user;
    const email = data.email;
    const result = await getUserProfileInfo(email);
    if (result) {
        res.status(200).send(result);
        return;
    } else {
        res.status(500).send({error: 'Database Query Error.'});
        return;
    }
};

module.exports ={
    getUserInfo
};