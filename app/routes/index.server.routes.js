const express = require('express')
const routes = express.Router()
const productController = require('../controllers/product.controller');

routes.route('/').get(productController.getMessage);
routes.route('/products').get(productController.getAllProducts);
routes.route('/products/:id').get(productController.getProductById);
routes.route('/products').post(productController.addNewProduct);
routes.patch('/products/:id', productController.updateProductById);
routes.route('/products/:id').delete(productController.removeProductById)
routes.route('/products').delete(productController.removeAllProducts)
routes.route('/products?name=kw').get(productController.getProductThatContainKw);
//routes.route('/categories').post(productController.addCategory);

module.exports = routes;

