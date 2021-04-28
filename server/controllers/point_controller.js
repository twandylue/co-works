const { getPoint
} = require('../models/point_model');


const point = async (req ,res) => {
    const userPoint = req.body.point;
    const userEmail = req.user.email;

    const resule = await getPoint(userEmail, userPoint) ;


    res.send('成功:D');
};

module.exports = {
    point
};