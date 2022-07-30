const express = require("express");
const router = express.Router();
const guestMiddleware = require('../middlewares/guestMiddleware')
const carritoController = require('../controllers/carrito-controller')

// Mostrar el carrito

router.get('/',guestMiddleware,carritoController.carrito)
router.post('/add', guestMiddleware,carritoController.addCarrito)
router.post('/update',carritoController.update)
router.post('/delete', carritoController.delete)
router.post('/process',carritoController.process)
router.post('/clear',carritoController.clear)
router.get('/feedback',carritoController.feedback)

module.exports = router;