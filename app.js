//node modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var authenticate = require('./authenticate');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var config = require('./config');



//route paths
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customerRouter');
var vehicleRouter = require('./routes/vehicleRouter');
var purchaseOrderRouter = require('./routes/purchaseOrderRouter');
var fuelStationRouter = require('./routes/fuelStationRouter');
var other = require('./routes/otherRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Customers = require('./models/customers');
const vehicles = require('./models/vehicles');
const purchaseOrders = require('./models/purchaseOrders');


//connecting to the db
const url = config.mongoUrl;
const connect = mongoose.connect(url, {useMongoClient:true})
connect.then((db)=>{
  console.log('Connected correctly to server...');
},(err)=>{console.log(err);});


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(passport.initialize());


//routes
app.use('/', indexRouter); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/customers', customerRouter);
app.use('/vehicles', vehicleRouter);
app.use('/purchaseOrders', purchaseOrderRouter);
app.use('/fuelStations', fuelStationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
