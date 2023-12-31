const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app) {
    // Express config (path подаваме релативен път и го получаваме в абсолютен)
    app.use(express.static(path.resolve(__dirname, '../public')));
    // body parser (парсва request`a , ако имаме изпратени POST данни от форма през request`a този парсър ще ги парсне в обикновен обект т.е после през req.body можем да видим всички изпратени данни)
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(auth);
}

module.exports = expressConfig;