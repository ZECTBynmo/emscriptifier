// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('5loQK0_9U2QzlJ8g');

var isProduction = (process.env.NODE_ENV === 'production');
var http = require('http');
var port = (isProduction ? 80 : 8000);

var express = require('express'),
    config = require("./config"),
    path = require('path'),
    http = require('http'),
    router = require(__dirname + '/routes/router');

var app = express();

app.configure( function() {
    app.set( 'port', process.env.NODE_ENV === 'production' ? 80 : config.port );
    app.use( express.logger('dev') );  /* 'default', 'short', 'tiny', 'dev' */
    app.use( express.bodyParser() ),
    app.use( express.static(path.join(__dirname, 'public')) );

    // Routes
    app.post( '/compile', router.compile );
});

// Create our server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log( "Express server listening on port " + app.get('port') );
});