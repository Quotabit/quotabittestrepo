var mongoose = require('mongoose');
var shortId = require('shortid');
var express = require('express');
var router = express.Router();
var agentmodel = require('../models/agent');


// HomePage
router.get('/', function(req, res){
    res.render('plans');
});


module.exports = router;