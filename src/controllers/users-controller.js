const path = require("path");
const db = require("../data/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

// Validaciones
const { validationResult } = require("express-validator");
const { fileURLToPath } = require("url");

// Hashear contraseña
const bcrypt = require("bcryptjs");
const session = require("express-session");

module.exports = {
  userProfile: (req, res) => {
    const loguedUser = req.session.usuarioLogueado;
    if (loguedUser) {
      res.render("user-profile", { user: loguedUser });
    } else {
      res.render("login");
    }
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
  processLogin: async (req, res) => {
    let isInDb;
    await db.User.findOne({
      where: { email: req.body.email },
    }).then((data) => (isInDb = data));
    if (isInDb != null) {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let userToLogin;
        await db.User.findOne({
          where: { email: req.body.email },
        }).then((data) => (userToLogin = data.dataValues));
        if (userToLogin) {
          if (bcrypt.compareSync(req.body.password, userToLogin.password)) {
            req.session.usuarioLogueado = userToLogin;
            if (req.body.rememberUser) {
              res.cookie("userEmail", req.body.email, {
                maxAge: 1000 * 40 * 1,
              });
            }
            return res.redirect("/users/user-profile");
          } else {
            return res.render("login", {
              errors: [
                {
                  msg: "Credenciales inválidas",
                },
              ],
              old: req.body,
            });
          }
        }
      } else {
        res.render("login", {
          errors: errors.array(),
          old: req.body,
        });
      }
    } else {
      return res.render("login", {
        errors: [{ msg: "El email no se encuentra en la base de datos" }],
        old: req.body,
      });
    }
  },
  logout: (req, res) => {
    req.session.usuarioLogueado = undefined;
    res.clearCookie("userEmail");
    res.redirect("/users/login");
  },
  update: async (req, res) => {
    const id = req.params.id;

    db.User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birth_date: req.body.birthdate,
      },
      {
        where: { id: id },
      }
    )
      .then(() => {
        db.User.findOne({
          where: { id: req.params.id },
        }).then((data) => {
          req.session.usuarioLogueado = data.dataValues;
          res.render("user-profile", {
            user: req.session.usuarioLogueado,
          });
        });
      })
      .catch((error) => res.send(error));
  },
  destroy: (req, res) => {
    db.User.destroy({ where: { id: req.params.id } });
    req.session.usuarioLogueado = undefined;
    res.clearCookie("userEmail");
    res.redirect("/");
  },
  store: async (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let userInDB = await db.User.findAll({
        where: { email: req.body.email },
      });

      if (!(userInDB == "")) {
        return res.render("register", {
          errors: [
            {
              msg: "Este email ya está registrado",
            },
          ],
          old: req.body,
        });
      }

      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        birth_date: req.body.birthdate,
        avatar: req.file ? req.file.filename : "unknown.jpg",
      });

      res.render("login");
    } else {
      res.render("register", {
        errors: errors.array(),
        old: req.body,
      });
    }
  },
};
