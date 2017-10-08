var mongoose = require('mongoose');
var shortId = require('shortid');
var express = require('express');
var router = express.Router();
var agentmodel = require('../models/agent');
var models = require('../models/trafficsearches');
var tsearchmodel = models.tsearch;

// HomePage
router.get('/', function(req, res){
    res.render('index');
});

router.post('/', function(req, res){
});

router.get('/help', function(req, res){
    res.render('help');
});

router.get('/about', function(req,res){
    res.render('about');
});


function eAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/agent/signin');
    }
}

module.exports = router;