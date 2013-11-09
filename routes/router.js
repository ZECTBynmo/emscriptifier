// Set us up to use JSON5
require('json5/lib/require');

var config = require("../config"),
	needle = require("needle");


// POST /compile
exports.compile = function( req, res ) {    
    
    // We don't want the browser to cache the results 
    res.header( 'Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0' );

    var url = "http://54.243.208.160:3000/compile";
    var sourceCode = {
		c: req.body.c
	};

	needle.post( url, sourceCode, function(err, response, body) {
		res.json( 200, body.js );
	});

}