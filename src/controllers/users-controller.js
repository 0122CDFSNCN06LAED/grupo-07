const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// Validaciones
const { validationResult } = require("express-validator");
const { fileURLToPath } = require("url");

// Hashear contraseña
const bcrypt = require("bcryptjs");

// Eventualmente esto se guardará en una cookie cuando el usuario
// se loguee.

module.exports = {
  userProfile: (req, res) => {
    const loguedUser = req.session.usuarioLogueado
    if(loguedUser){
      res.render("user-profile", { user: loguedUser,log_flag: req.session.usuarioLogueado ? true : false });
    }else{
      res.render('login',{log_flag: req.session.usuarioLogueado ? true : false})
    }
  },
  register: (req, res) => {
    res.render("register",{log_flag: req.session.usuarioLogueado ? true : false});
  },
  login: (req, res) => {
    res.render("login",{log_flag: req.session.usuarioLogueado ? true : false});
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let userToLogin = users.find((user) => user.email == req.body.email);

      if(userToLogin){
        if(bcrypt.compareSync(req.body.password,userToLogin.password)){
          req.session.usuarioLogueado = userToLogin;
          return res.render("user-profile", { user: userToLogin,log_flag: req.session.usuarioLogueado ? true : false })
        }else{
          return res.render('login',{
            errors: [{
                msg: 'Credenciales inválidas'
            }],
            old: req.body,
          })
        }
      }else{
        return res.render('login',{
          errors: [{
              msg: 'Credenciales inválidas'
          }],
          old: req.body,
          log_flag: req.session.usuarioLogueado ? true : false 
        })
      }
    } else {
      res.render("login", {
        errors: errors.array(),
        old: req.body,
        log_flag: req.session.usuarioLogueado ? true : false 
      });
    }
    
  },
  logout: (req,res) =>{
    req.session.usuarioLogueado = undefined
    console.log(req.session.usuarioLogueado);
    res.render("login",{log_flag: req.session.usuarioLogueado ? true : false});
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
    res.redirect("/users/user-profile");
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
          old: req.body,
          log_flag: req.session.usuarioLogueado ? true : false
        });
      }

      const user = {
        ...req.body,
        id: Number(newId),
        profile_pic: req.file ? req.file.filename : "unknown.jpg",
        password: bcrypt.hashSync(req.body.password, 10),
      };

      users.push(user);

      const jsonTxt = JSON.stringify(users, null, 2);
      fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");
      req.session.usuarioLogueado = user;
      res.render("user-profile", { user: user,log_flag: req.session.usuarioLogueado ? true : false });
    } else {
      res.render("register", {
        errors: errors.array(),
        old: req.body,
        log_flag: req.session.usuarioLogueado ? true : false
      });
    }
  },
};
