const express = require('express')

const router = require("express").Router();

const {
    getAllProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
   

} = require('../controllers/product')





router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/product/new').post(newProduct);

router.route('/product/:id')
    .put( updateProduct)
    .delete( deleteProduct);





module.exports = router;

