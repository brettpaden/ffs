"use strict"

const http_errors = require('http-errors');
const express = require('express');
const path = require('path');
const cookie_parser = require('cookie-parser');
const index_route = require('./routes/index');
const play_route = require('./routes/play');
const db = require('./db');

const app = express();
db.connect(db.MODE_PRODUCTION, (error) => {
	if (error) {
		console.warn("Error connecting to database");
		console.warn(error.trace);
		process.exit(1);
	}
	console.log("Connected to mysql database");
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/play', play_route);
app.use('/', index_route);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(http_errors(404));
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
