const path = require("path");
const db = require("../data/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const Product = require("../data/models/Product");
const { validationResult } = require("express-validator");

module.exports = {
  index: (req, res) => {
    db.Product.findAll().then((product) => {
      res.render("products", { products: product });
    });
  },
  search: (req,res) => {
    db.Product.findAll({
      where: {
        brand: {
          [Op.like]: '%'+req.body.search+'%'}
      }
    })
    .then(product => {
      res.render("products", { products: product })
    })
  },
  create: (req, res) => {
    res.render("product-create-form");
  },
  store: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Product.create({
        brand: req.body.brand,
        model: req.body.model,
        manufacture_year: req.body.manufacture_year,
        color: req.body.color,
        door_number: req.body.door_number,
        transmission: req.body.transmission,
        motor_type: req.body.motor_type,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        image: req.file
          ? req.file.filename
          : "default-image.png",
      })
      .then(() => {
        let new_id = db.Product.findAll().then(result => result[result.length -1 ].id)
        new_id.then(R => {
          db.Users_Products.create({
            user_id: req.session.usuarioLogueado.id,
            product_id: R
          })
        })
      })
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => res.send(error))

      
      
      
    } else {
      res.render("product-create-form", {
        errors: errors.array(),
        old: req.body,
      });
    }
  },

  edit: (req, res) => {
    const id = req.params.id;
    const product = db.Product.findByPk(id);
    product.then((product) => {
      res.render("product-edit-form", { product: product });
    });
  },
  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const id = req.params.id;
      db.Product.update(
        {
          brand: req.body.brand,
          model: req.body.model,
          manufacture_year: req.body.manufacture_year,
          color: req.body.color,
          door_number: req.body.door_number,
          transmission: req.body.transmission,
          motor_type: req.body.motor_type,
          description: req.body.description,
          price: req.body.price,
          discount: req.body.discount
        },
        {
          where: { id: id },
        }
      )
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => res.send(error));
    } else {
      res.render("product-edit-form", {
        errors: errors.array(),
        product: req.body,
      });
    }
  },
  description: (req, res) => {
    const id = req.params.id;
    const product = db.Product.findByPk(id).then((product) => {
      edit_delete = req.session.usuarioLogueado != undefined
      if(edit_delete){
        db.Users_Products.findAll({
          where: {
            user_id: req.session.usuarioLogueado.id
          }
        })
        .then(prods => prods.filter(prod => prod.product_id == id))
        .then(result => {
          if(result.length == 0){
            edit_delete = false
          }else{
            edit_delete = true
          }
          res.render("description", { 
            product: product,
            edit_delete: edit_delete
          })
        })
      }else{
        res.render("description", { 
          product: product,
          edit_delete: edit_delete
        })
      }

    });
    
  },
  destroy: (req, res) => {
    const id = req.params.id;
    db.Product.destroy({
      where: {
        id: id,
      },
      force: true,
    })
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => {
        res.send(error);
      });
  },
};
