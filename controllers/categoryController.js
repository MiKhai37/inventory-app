var Category = require('../models/category');
var Item = require('../models/item');

var async = require('async');
const { body, validationResult } = require('express-validator');



// Display inventory home page
exports.index = function (req, res) {

  async.parallel({
    category_count: function(callback) {
      Category.countDocuments({}, callback);
    },
    item_count: function(callback) {
      Item.countDocuments({}, callback);
    },
  }, function(err, results) {
    res.render('index', { title: 'Inventory Home', error: err, data: results})
  });
};

// Display category page list
exports.category_list = function (req, res) {

};

// Display category detail page
exports.category_detail = function (req, res) {

};

// Display category create form on GET
exports.category_create_get = function(res, req, next) {

};

// Handle category create on POST
exports.category_create_post = [

];

// Display category delete form on GET
exports.category_delete_get = function(res, req, next) {

};

// Handle category delete on POST
exports.category_delete_post = function(res, req, next) {

}

// Display category update form on GET
exports.category_update_get = function(res, req, next) {

}

// Handle category update on POST
exports.category_update_post = [

];