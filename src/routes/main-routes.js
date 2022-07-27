const { Router } = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");

// Vincula rutas con controladores
router.get("/", mainController.home);
router.get("/carrito-compras", mainController.carrito);
module.exports = router;