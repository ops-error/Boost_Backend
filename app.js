require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require("cookie-parser");

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO);

app.use('/', router);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message
  });
  next();
});

app.listen(PORT, () => {
    console.log('App listen u');
});