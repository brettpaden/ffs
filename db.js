"use strict"

const mysql = require('mysql');

const connection = mysql.createConnection({
	database: 'ffs'
});

const PRODUCTION_DB = 'ffs';
const TEST_DB = 'ffs_test';

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, callback) {
	state.pool = mysql.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PWD,
		database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
	});
	state.mode = mode
	callback();
}

exports.get = function() {
	return state.pool
}
