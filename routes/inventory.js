var express = require('express');
var router = express.Router();

//Controller
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');

/* Category Routes CRUD*/

// GET inventory home page
router.get('/', category_controller.index)

// GET request for creating a Category
router.get('/category/create', category_controller.category_create_get);

// POST request for creating a Category
router.post('/category/create', category_controller.category_create_post);

// GET request to delete a Category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete a Category
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update a Category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update a Category
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for category detail
router.get('/category/:id', category_controller.category_detail);

// GET request for category list
router.get('/categories', category_controller.category_list);

/* Item Routes CRUD*/

// GET request for creating a item
router.get('/item/create', item_controller.item_create_get);

// POST request for creating a item
router.post('/item/create', item_controller.item_create_post);

// GET request to delete a item
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete a item
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update a item
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update a item
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for item detail
router.get('/item/:id', item_controller.item_detail);

// GET request for item list
router.get('/items', item_controller.item_list);

module.exports = router;