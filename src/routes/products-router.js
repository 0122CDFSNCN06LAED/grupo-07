const express = require("express");
const router = express.Router();

const productController = require("../controllers/products-controller");

/*** GET ALL PRODUCTS ***/ 
router.get("/", productController.index)

/*** CREATE ONE PRODUCT ***/ 
router.get("/create", productController.create); // Get al formulario de creacion de un producto
router.post("/", productController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get("/edit/:id", productController.edit);
router.put('/:id', productController.update);

/*** GET ONE PRODUCT ***/ 
router.get("/description/:id/", productController.description);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 


module.exports = router;
