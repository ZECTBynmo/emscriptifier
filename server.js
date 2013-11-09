// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('5loQK0_9U2QzlJ8g');

var isProduction = (process.env.NODE_ENV === 'production');
var http = require('http');
var port = (isProduction ? 80 : 8000);

//http.createServer(function (req, res) {
//    // http://blog.nodeknockout.com/post/35364532732/protip-add-the-vote-ko-badge-to-your-app
//    var voteko = '<iframe src="http://nodeknockout.com/iframe/zect" frameborder=0 scrolling=no allowtransparency=true width=115 height=25></iframe>';
//    
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    res.end('<html><body>' + voteko + '</body></html>\n');
//}).listen(port, function(err) {
//    if (err) { console.error(err); process.exit(-1); }
//  
//    // if run as root, downgrade to the owner of this file
//    if (process.getuid() === 0) {
//        require('fs').stat(__filename, function(err, stats) {
//            if (err) { return console.error(err); }
//            process.setuid(stats.uid);
//        });
//    }
//  
//    console.log('Server running at http://0.0.0.0:' + port + '/');
//});

var express = require('express'),
    config = require("./config"),
    path = require('path'),
    http = require('http'),
    io = require('socket.io'),
    router = require(__dirname + '/routes/router');

var app = express();

app.configure( function() {
    app.set( 'port', process.env.NODE_ENV === 'production' ? 80 : config.port );
    app.use( express.logger('dev') );  /* 'default', 'short', 'tiny', 'dev' */
    app.use( express.bodyParser() ),
    app.use( express.static(path.join(__dirname, 'public')) );

    // leto-marker-server-routes
});

// Create our server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log( "Express server listening on port " + app.get('port') );
});