const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

module.exports = app;
