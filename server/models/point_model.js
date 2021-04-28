const {transaction, commit, rollback, query} = require('./mysqlcon');

const getPoint = async (email, point) =>{
    const command = {mysql:'', email: [email], money:[point]};
    const userId = await query('SELECT id FROM user WHERE email = ?', command.email);

    const sort = JSON.parse(JSON.stringify(userId));
    console.log(sort[0].id);

    command.mysql = 'UPDATE `user` SET `points` = ? WHERE (`id` = ?)';
    command.money.push(sort[0].id);

    try {

        const resule = await query(command.mysql, command.money);
        return resule;

    } catch (error) {
        console.log(error);
        return error;
    }

};


const selsectPoint = async (email) =>{
    const command = {mysql:'', email: [email]};

    command.mysql = 'SELECT * FROM user WHERE email = ?';

    try {

        const resule = await query(command.mysql, command.email);
        const sort = JSON.parse(JSON.stringify(resule));
        console.log(sort[0]);
        return sort[0].points;

    } catch (error) {
        console.log(error);
        return error;
    }

};


module.exports = {
    getPoint,
    selsectPoint
};