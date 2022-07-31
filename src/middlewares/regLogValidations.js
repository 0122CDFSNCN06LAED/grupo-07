const { check, body } = require("express-validator");
const path = require("path");

const validaciones = (control) => {
  if (control == "login") {
    return [
      body("password")
        .isLength({ min: 6 })
        .withMessage(
          "Debe ingresar una contraseña válida de más de 6 caracteres"
        ),
      body("email").isEmail().withMessage("Debe ingresar un email válido"),
    ];
  }
  if (control == "register") {
    return [
      body("first_name")
        .isLength({ min: 2 })
        .withMessage("Debe ingresar un nombre válido de más de 2 caracteres"),
      body("last_name")
        .isLength({ min: 2 })
        .withMessage("Debe ingresar un apellido válido de más de 2 caracteres"),
      body("username")
        .notEmpty()
        .withMessage("Debe ingresar un usuario válido"),
      body("email").isEmail().withMessage("Debe ingresar un email válido"),
      body("password")
        .isLength({ min: 8 })
        .withMessage(
          "Debe ingresar una contraseña válida de más de 8 caracteres"
        ),
      body("confirm_password")
        .isLength({ min: 8 })
        .withMessage(
          "Debe ingresar una contraseña válida de más de 8 caracteres"
        ),
      body("birthdate")
        .notEmpty()
        .withMessage("Debe ingresar una fecha válida"),
      body("password").custom((value, { req }) => {
        if (value != req.body.confirm_password) {
          throw new Error("Las contraseñas no coinciden");
        } else {
          return true;
        }
      }),
      body("profile_pic").custom((value, { req }) => {
        let file = req.file;

        if (!file) {
          throw new Error("Tienes que subir una imagen");
        } else {
          let extensions = [".jpg", ".jpeg", ".png", ".gif"];
          let fileExtension = path.extname(file.originalname);
          console.log(file);
          if (extensions.includes(fileExtension) == false) {
            throw new Error("Debe ser un archivo valido (JPG, JPEG, PNG, GIF)");
          }
        }
        return true;
      }),
    ];
  }
};

module.exports = validaciones;
