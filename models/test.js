var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var shortId = require('shortid');
var Schema = mongoose.Schema;

// Test Model
var testSchema = new Schema({
    _id: String,
    title: String,
    date_made: Date,
    summary: String,
    first_name: String,
    last_name: String
});

var test = mongoose.model('test', testSchema);

module.exports = {
    test: test
}