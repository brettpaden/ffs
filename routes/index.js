"use strict"

const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', function(request, result, next) {
	result.render('index', { title: 'Express' });
});

module.exports = router;
