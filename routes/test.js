var mongoose = require('mongoose');
var shortId = require('shortid');
var express = require('express');
var router = express.Router();
var agentmodel = require('../models/agent');
var models = require('../models/test');
var testmodel = models.test;

// Home Page
router.get('/', eAuth, function(req, res){
    res.send('Yay you are on the test page');
});


function eAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/agent/signin');
    }
}
module.exports = router;