const express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//CORS Support
app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE, PATCH')
res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
res.setHeader('Access-Control-Allow-Credentials', true)
    next();
})


let mongoServer = 'mongodb+srv://admin:doritos1@cluster0-ctnrv.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoServer, { useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => {console.log('Connected to DB')},
    err => {console.log(err)}
)


var indexRouter = require('./routes/index');
var items = require('./routes/items')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/items', items)


module.exports = app;
