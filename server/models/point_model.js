const {transaction, commit, rollback, query} = require('./mysqlcon');

const getPoint = async (email) =>{
    const command = {mysql:'', id: email};

    command.mysql = 'SELECT points FROM stylish.user WHERE email = ?';

    try {
        const resule = await query(command.mysql, command.id);
        return resule;

    } catch (error) {
        console.log(error);
        return error;
    }

};


module.exports = {
    getPoint
};