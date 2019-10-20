'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var main = require('./modules/main');
var routes = require('./routes/index');
var app = express();
app.post('/SendPayment', function(req, res){
    var store = '';
    req.on('data', function(data) 
    {
        store += data;
    });
  
   
    req.on('end', function () {
        var input = JSON.parse(store);
        main.Start(input.amount, input.receiptMsgMerchant, input.receiptMsgCustomer).then(function (result) {
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(result));
        }).catch(function (err) {
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify("Bir hata oluştu-->"+err));
        });
     
        
    });
});


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 3000);



var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


