const { getPoint
} = require('../models/point_model');


const playGame = async (req ,res) => {

    res.send('<div id="box"></div>\
    <script>\
    const array = [0,0,0,0,0,0,0,0,0];\
    console.log(array);\
    for(let i=0; i<9; i++){\
        const outElement = document.getElementById("box");\
        const newChild = document.createElement("div");\
        newChild.textContent = "a";\
        outElement.appendChild(newChild);\
        \
    }\
    </script>\
    <style>\
    #box{\
        width:500px;\
        height:500px;\
        display: flex;\
        flex-wrap: wrap;\
        justify-content: space-between;\
    }\
    #box > div{\
        margin-top:3px;\
        color:red;\
        width:33%;\
        background-color:black;\
    }\
    </style>\
    ');
};

module.exports = {
    playGame
};