var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index.js');
var person = require('./routes/person.js');

var mongoose = require('mongoose');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json()); // needed for angular requests

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/', index);
app.use('/person', person);


/** MONGOOSE CONNECTION **/
// required
var databaseUrl = 'mongodb://localhost:27017/demo824';
mongoose.connect(databaseUrl, 
{
    useMongoClient: true
});

// optional, but very nice
mongoose.connection.on('connected', function() {
    console.log('mongoose connected to : ', databaseUrl);    
});
mongoose.connection.on('error', function (err) {
    console.log('mongoose connection error to : ', err);
});

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
