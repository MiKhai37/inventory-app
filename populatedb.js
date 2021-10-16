#! /usr/bin/env node

console.log('This script populates items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
var Item = require('./models/item');
var Category = require('./models/category');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []

function categoryCreate(name, description, cb) {
  categorydetail = { name: name };
  if (!description) categorydetail.description = description;

  var category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    };
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
};

function itemCreate(name, description, category, price, number_in_stock, cb) {
  itemdetail = { name: name, category: category, price: price, number_in_stock: number_in_stock };
  if (!description) itemdetail.description = description;

  var item = new Item(itemdetail);

  item.save(function (err) {
    if (err) {
      console.log('ERROR CREATING item: ' + item);
      cb(err, null);
      return;
    };
    console.log('New item: ' + item);
    items.push(item);
    cb(null, category);
  });
};

function createCategories(cb) {
  async.series([
    function (callback) {
      categoryCreate('Cat_1', 'Cat_1 description', callback);
    },
    function (callback) {
      categoryCreate('Cat_2', false, callback);
    },
    function (callback) {
      categoryCreate('Cat_3', 'Cat_3 description', callback);
    },
  ],
    // optional callback
    cb);
};

function createItems(cb) {
  async.series([
    function (callback) {
      itemCreate('Item_1', 'Item_1 description', categories[0], 8, 2, callback);
    },
    function (callback) {
      itemCreate('Item_2', 'Item_2 description', categories[1], 7.45, 5, callback);
    },
    function (callback) {
      itemCreate('Item_3', 'Item_3 description', categories[0], 37.63, 1, callback);
    },
    function (callback) {
      itemCreate('Item_4', 'Item_4 description', categories[2], 10.30, 0, callback);
    },
    function (callback) {
      itemCreate('Item_5', 'Item_5 description', categories[1], 9.99, 2, callback);
    },
  ],
    cb);
};

async.series([ // Categories need to be create first
  createCategories,
  createItems,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('items: ' + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });



