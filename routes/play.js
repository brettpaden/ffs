"use strict"

const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/', function(request, result, next) {
	const query = db.get().query('insert into plays set ?', request.body.play, (error, results, fields) => {
		result.status(200).json({});
	});
});

module.exports = router;
