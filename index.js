const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/boostdb');

app.use('/', router);

app.listen(PORT, () => {
    console.log('App listen u');
});