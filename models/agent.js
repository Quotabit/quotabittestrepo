var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    _id: String,
    name: String,
    username: String,
    email: String,
    password: String,
    plans_created: Number,
    agent_type: String,
    phone_number: String,
    address: String,
    agency_name: String,
    state: String,
    city: String,
    lead_number: Number,
    years_in_business: String,
    agent_liscense_number: String
});

var User = module.exports = mongoose.model('agent', userSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}