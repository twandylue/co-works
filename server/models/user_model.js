require('dotenv').config();
const bcrypt = require('bcrypt');
const got = require('got');
const {query, transaction, commit, rollback} = require('./mysqlcon');
const salt = parseInt(process.env.BCRYPT_SALT);
const {TOKEN_EXPIRE, TOKEN_SECRET} = process.env; // 30 days by seconds
const jwt = require('jsonwebtoken');

const USER_ROLE = {
    ALL: -1,
    ADMIN: 1,
    USER: 2
};

const signUp = async (name, roleId, email, password) => {
    try {
        await transaction();

        const emails = await query('SELECT email FROM user WHERE email = ? FOR UPDATE', [email]);
        if (emails.length > 0){
            await commit();
            return {error: 'Email Already Exists'};
        }

        const loginAt = new Date();

        const user = {
            provider: 'native',
            role_id: roleId,
            email: email,
            password: bcrypt.hashSync(password, salt),
            name: name,
            picture: null,
            access_expired: TOKEN_EXPIRE,
            login_at: loginAt
        };
        const accessToken = jwt.sign({
            provider: user.provider,
            name: user.name,
            email: user.email,
            picture: user.picture
        }, TOKEN_SECRET);
        user.access_token = accessToken;

        const queryStr = 'INSERT INTO user SET ?';
        const result = await query(queryStr, user);

        user.id = result.insertId;
        await commit();
        return {user};
    } catch (error) {
        console.log(error);
        await rollback();
        return {error};
    }
};

const nativeSignIn = async (email, password) => {
    try {
        await transaction();

        const users = await query('SELECT * FROM user WHERE email = ?', [email]);
        const user = users[0];
        if (!bcrypt.compareSync(password, user.password)){
            await commit();
            return {error: 'Password is wrong'};
        }

        const loginAt = new Date();
        const accessToken = jwt.sign({
            provider: user.provider,
            name: user.name,
            email: user.email,
            picture: user.picture
        }, TOKEN_SECRET);

        const queryStr = 'UPDATE user SET access_token = ?, access_expired = ?, login_at = ? WHERE id = ?';
        await query(queryStr, [accessToken, TOKEN_EXPIRE, loginAt, user.id]);

        await commit();

        user.access_token = accessToken;
        user.login_at = loginAt;
        user.access_expired = TOKEN_EXPIRE;
        return {user};
    } catch (error) {
        await rollback();
        return {error};
    }
};

const facebookSignIn = async (id, roleId, name, email) => {
    try {
        await transaction();
        const loginAt = new Date();
        let user = {
            provider: 'facebook',
            role_id: roleId,
            email: email,
            name: name,
            picture:'https://graph.facebook.com/' + id + '/picture?type=large',
            access_expired: TOKEN_EXPIRE,
            login_at: loginAt
        };
        const accessToken = jwt.sign({
            provider: user.provider,
            name: user.name,
            email: user.email,
            picture: user.picture
        }, TOKEN_SECRET);
        user.access_token = accessToken;

        const users = await query('SELECT id FROM user WHERE email = ? AND provider = \'facebook\' FOR UPDATE', [email]);
        let userId;
        if (users.length === 0) { // Insert new user
            const queryStr = 'insert into user set ?';
            const result = await query(queryStr, user);
            userId = result.insertId;
        } else { // Update existed user
            userId = users[0].id;
            const queryStr = 'UPDATE user SET access_token = ?, access_expired = ?, login_at = ?  WHERE id = ?';
            await query(queryStr, [accessToken, TOKEN_EXPIRE, loginAt, userId]);
        }
        user.id = userId;

        await commit();

        return {user};
    } catch (error) {
        await rollback();
        return {error};
    }
};

const getUserDetail = async (email, roleId) => {
    try {
        if (roleId) {
            const users = await query('SELECT * FROM user WHERE email = ? AND role_id = ?', [email, roleId]);
            return users[0];
        } else {
            const users = await query('SELECT * FROM user WHERE email = ?', [email]);
            return users[0];
        }
    } catch (e) {
        return null;
    }
};

const getFacebookProfile = async function(accessToken){
    try {
        let res = await got('https://graph.facebook.com/me?fields=id,name,email&access_token=' + accessToken, {
            responseType: 'json'
        });
        return res.body;
    } catch (e) {
        console.log(e);
        throw('Permissions Error: facebook access token is wrong');
    }
};

module.exports = {
    USER_ROLE,
    signUp,
    nativeSignIn,
    facebookSignIn,
    getUserDetail,
    getFacebookProfile,
};