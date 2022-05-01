const express = require("express");
const router = express.Router();

const productController = require("../controllers/products-controller");

router.get("/", productController.index); //GET para mostrar la lista de productos
router.get("/create", productController.create); // Get al formulario de creacion de un producto
router.get("/edit", productController.edit); //Get al formulario de edicion de un producto
router.get("/description", productController.description); //Get detalle del producto
module.exports = router;
