var mongoose = require('mongoose');
var express = require('express');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var shortId = require('shortid');
var bcrypt = require('bcryptjs');


var indieplanSchema = new Schema({
    _id: String,
    title: String,
    clicks: Number,
    by_who: String,
    date_created: Date,
    price: Number,
    adv_1: String,
    adv_2: String,
    adv_3: String,
    adv_4: String,
    adv_5: String,
    for_who: String,
    zip_codes: String,
    insurance_type: String
});

var indieplan = mongoose.model('indieplan', indieplanSchema);


var capplanSchema = new Schema({
    _id: String,
    title: String,
    clicks: Number,
    by_who: String,
    adv_1: String,
    adv_2: String,
    adv_3: String,
    adv_4: String,
    adv_5: String,
    date_created: Date,
    price: Number,
    zip_codes: String,
    for_who: String,
    insurance_type: String,
    l_birthdate: {type: Boolean, default: false}, 
    l_cscore: {type: Boolean, default: false}
});

var capplan = mongoose.model('capplan', capplanSchema);


module.exports = {
    indieplan: indieplan,
    capplan: capplan
}