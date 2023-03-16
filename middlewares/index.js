const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports.initMiddlewares = (app) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(morgan('tiny'));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });
    app.use(cors());
}