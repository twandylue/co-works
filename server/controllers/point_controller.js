const { getPoint
} = require('../models/point_model');


const point = async (req ,res) => {
    const userEmail = await req.user.email;
    console.log(userEmail);
    const resule = await getPoint(userEmail) ;

    const data = {
        data:resule[0]
    };

    res.send(data);
};

module.exports = {
    point
};