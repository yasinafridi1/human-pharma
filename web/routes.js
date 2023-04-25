const express = require('express');
const productcontroller = require('../app/https/controller/productController/productcontroller');
const categoryController = require('../app/https/controller/productController/categoryController');
const auth = require('../app/https/middleware/auth');
const authController = require('../app/https/controller/adminController/authController');
const UserModel = require('../app/models/UserModel');
const Router = express.Router();


// Router.get('/register', authController().register);
Router.post('/loginadmin', authController().login);
// Router.get('/authen', productcontroller().insertAuthenticity);
Router.get('/adminautologin', authController().autoLogin);
// Router.get('/register', authController().register);

// product routes
Router.get('/allProducts', productcontroller().allProduct);
Router.post('/addProduct', auth, productcontroller().addProduct);
Router.post('/check-authenticity', productcontroller().authenticityCheck);
Router.post('/deleteProduct', auth, productcontroller().deleteProduct);
Router.post('/getSingleProduct', productcontroller().singleProduct);
Router.post('/updateProduct', auth, productcontroller().updateProduct);


// categories routes
Router.get('/allCategories', categoryController().allCategories);
Router.post('/addCategory', auth, categoryController().addCategory);
Router.post('/deleteCategory', auth, categoryController().deletecategory);


module.exports = Router;