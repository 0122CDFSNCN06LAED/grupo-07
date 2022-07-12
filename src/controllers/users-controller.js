const path = require("path");
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


// Validaciones
const { validationResult } = require("express-validator");
const { fileURLToPath } = require("url");

// Hashear contraseña
const bcrypt = require("bcryptjs");

module.exports = {
  userProfile: (req, res) => {
    const loguedUser = req.session.usuarioLogueado
    if(loguedUser){
      res.render("user-profile", { user: loguedUser});
    }else{
      res.render('login')
    }
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let userToLogin = db.User.findAll({
        where: {
          email: req.body.email
        }
      })
      userToLogin
      .then(res => {
        console.log(res)
      })
    } else {
      res.render("login", {
        errors: errors.array(),
        old: req.body});
    }
    
  },
  logout: (req,res) =>{
    req.session.usuarioLogueado = undefined
    res.clearCookie('userEmail')
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
    req.session.usuarioLogueado = users[index]
    res.render("user-profile", { user: req.session.usuarioLogueado})
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
  store: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const newId =
        users.reduce((acc, p) => {
          return p.id > acc ? p.id : acc;
        }, 0) + 1;

      let userInDB = users.find((user) => user.email == req.body.email);

      if (userInDB) {
        return res.render("register", {
          errors: [{
              msg: 'Este email ya está registrado'
          }],
          old: req.body});
      }

      const user = {
        ...req.body,
        id: Number(newId),
        profile_pic: req.file ? req.file.filename : "unknown.jpg",
        hashed_password: bcrypt.hashSync(req.body.password, 10),
      };

      users.push(user);

      const jsonTxt = JSON.stringify(users, null, 2);
      fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");
      res.render("login");
    } else {
      res.render("register", {
        errors: errors.array(),
        old: req.body});
    }
  },
};
