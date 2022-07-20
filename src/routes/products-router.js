const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img/products-img"));
  },
  filename: (req, file, cb) => {
    const newFileName = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
const upload = multer({ storage });

const productController = require("../controllers/products-controller");

const productsValidation = require("../middlewares/productsValidation");

/*** GET ALL PRODUCTS ***/
router.get("/", productController.index);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productController.create); // Get al formulario de creacion de un producto
router.post(
  "/",
  upload.single("image"),
  productsValidation,
  productController.store
);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productController.edit);
router.put(
  "/:id",
  upload.single("image"),
  productsValidation,
  productController.update
);

/*** GET ONE PRODUCT ***/
router.get("/description/:id/", productController.description);

/*** DELETE ONE PRODUCT***/
router.delete("/:id", productController.destroy);

module.exports = router;
