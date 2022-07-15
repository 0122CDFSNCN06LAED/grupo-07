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
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let userToLogin;
      await db.User.findOne({
        where: { email: req.body.email },
      }).then((data) => (userToLogin = data.dataValues));
      console.log(req.body.password);
      console.log(userToLogin.password);
      console.log(
        bcrypt.compareSync(
          "lich2112",
          "$2a$10$TN00v8zyNd3cE4Rn48ScjO2NLZGvbwWEu.d.6stK5Ag"
        )
      );
      if (userToLogin) {
        if (bcrypt.compareSync(req.body.password, userToLogin.password)) {
          req.session.usuarioLogueado = userToLogin;
          if (req.body.rememberUser) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 40 * 1 });
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
  },
  logout: (req, res) => {
    req.session.usuarioLogueado = undefined;
    res.clearCookie("userEmail");
    res.redirect("/users/login");
  },
  update: (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((user) => user.id == id);
    Object.assign(users[index], {
      ...req.body,
      id,
    });
    const jsonTxt = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");
    // res.redirect("/users/user-profile");
    req.session.usuarioLogueado = users[index];
    res.render("user-profile", { user: req.session.usuarioLogueado });
  },
  destroy: (req, res) => {
    const id = req.params.id;
    users.splice(
      users.findIndex((user) => user.id == id),
      1
    );
    const jsonTxt = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");
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
      let encryptedPass = bcrypt.hashSync(req.body.password, 10);
      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: encryptedPass,
        birth_date: req.body.first_name,
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
