/// <reference path='../declarations/node.d.ts' />
'use strict';

// config
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];

// third party
var express = require('express');           // http server + rendering
var app = express();                        // setup server
var server = require('http').Server(app);   // HTTP server

app.set('view engine', 'jade');
app.set('views', __dirname + '/../src/views');
app.set('title', config.title);
app.use('/favicon.ico', express.static('static/images/favicon.ico'));

app.use(express.static(__dirname + '/../static'));      // serving static files


app.get('/', function (req, res) {
	res.render('game', {
		title: app.get('title')
	})
});

server.listen(config.port);