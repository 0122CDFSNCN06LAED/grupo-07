const { Router } = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");

// Vincula rutas con controladores
router.get("/", mainController.home);
router.get("/register", mainController.register);
router.get("/login", mainController.login);

module.exports = router;
