// run a static web server
var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/build'));
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("HTTP server started on port", server.address().port);
});

// modify the config in memory to include cleaning and auto-reloading
var config = require('./metalsmith.json');
config.clean = true;
config.plugins['metalsmith-watch'] = {
    livereload: true
};
config.metadata.customScript = "document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')";

// run the standard CLI
require('metalsmith/bin/metalsmith');