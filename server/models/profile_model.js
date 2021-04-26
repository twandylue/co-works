require('dotenv').config();
const {query, transaction, commit, rollback} = require('./mysqlcon');

const getUserProfileInfo = async (email, roleId) => {
    try {
        if (roleId) {
            const users = await query('SELECT * FROM user WHERE email = ? AND role_id = ?', [email, roleId]);
            return users[0];
        } else {
            const users = await query('SELECT `name`, id, picture FROM user WHERE email = ?', [email]);
            return users[0];
        }
    } catch (e) {
        return null;
    }
};

module.exports = {
    getUserProfileInfo
};