require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO);

app.use('/', router);

app.listen(PORT, () => {
    console.log('App listen u');
});