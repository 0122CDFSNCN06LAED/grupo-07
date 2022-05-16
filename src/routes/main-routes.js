const { Router } = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");

// Vincula rutas con controladores
router.get("/", mainController.home);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.get("/carrito-compras", mainController.carrito);
router.get("/description", mainController.description);
module.exports = router;
