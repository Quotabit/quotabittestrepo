var mongoose = require('mongoose');
var express = require('express');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var shortId = require('shortid');
var bcrypt = require('bcryptjs');

var tsearchSchema = new Schema({
    _id: String,
    email: String,
    zip_code: Number,
    insurance_type: String,
    date_searched: Date
});

var Tsearch = mongoose.model('tsearch', tsearchSchema);

module.exports = {
    tsearch: Tsearch
}