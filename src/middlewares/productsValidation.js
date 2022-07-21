const { body } = require("express-validator");
const path = require("path");

const productsValidation = [
  body("brand").notEmpty().withMessage("Debe Ingresar una marca valida"),
  body("model").notEmpty().withMessage("Debe ingresar un modelo"),
  body("manufacture_year")
    .notEmpty()
    .withMessage("Debe ingresar un año de manufactura"),
  body("color").notEmpty().withMessage("Debe ingresar un color"),
  body("transmission")
    .notEmpty()
    .withMessage("Debe ingresar el tipo de transmision"),
  body("motor_type").notEmpty().withMessage("Debe ingresar un tipo de motor"),
  body("description")
    .isLength({ min: 20 })
    .withMessage("La descripcion debe tener al menos 20 caracteres"),
  body("image").custom((value, { req }) => {
    let file = req.file;

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let extensions = [".jpg", "jpeg", ".png", ".gif"];
      let fileExtension = path.extname(file.originalname);
      if (extensions.includes(fileExtension) == false) {
        throw new Error("Debe ser un archivo valido (JPG, JPEG, PNG, GIF)");
      }
    }
    return true;
  }),
  body("price").notEmpty().withMessage("Debe ingresar un precio"),
  body("discount").notEmpty().withMessage("Debe ingresar un descuento"),
];

module.exports = productsValidation;
