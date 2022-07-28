const express = require("express");
const router = express.Router();
const path = require("path");
const guestMiddleware = require('../middlewares/guestMiddleware')
const carritoController = require('../controllers/carrito-controller')

// Mostrar el carrito

router.get('/',guestMiddleware,carritoController.carrito)
router.post('/add', carritoController.addCarrito)
router.post('/update',carritoController.update)
router.post('/delete', carritoController.delete)
router.post('/process',carritoController.process)
router.post('/clear',carritoController.clear)

module.exports = router;