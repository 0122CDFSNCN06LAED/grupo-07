const path = require("path");
const db = require("../data/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const Product = require("../data/models/Product");
const Category = require("../data/models/Category");
const { validationResult } = require("express-validator");

module.exports = {
  index: (req, res) => {
    db.Product.findAll().then((product) => {
      res.render("products", { products: product });
    });
  },
  consulta: (req,res) =>{
    const id = req.params.id;
    db.Product.findByPk(id)
    .then(result => {
      res.render('consulta',{product: result})
    })
  },
  feedback: (req,res) => {
    res.render('feedback')
  },
  search: (req, res) => {
    db.Product.findAll({
      where: {
        brand: {
          [Op.like]: "%" + req.body.search + "%",
        },
      },
    }).then((product) => {
      res.render("products", { products: product });
    });
  },
  own: async (req,res) => {
    const id = req.session.usuarioLogueado.id
    const ids = await db.Users_Products.findAll({
      where: {
        user_id: id
      }
    })
    const products_ids = ids.map(item => item.dataValues.product_id);
    const products = await db.Product.findAll({
      where: {
        id: products_ids
      }
    })
    res.render('productosPropios',{products})
  },
  create: async (req, res) => {
    const category = await db.Category.findAll();
    res.render("product-create-form", {
      category: category,
    });
  },
  store: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Product.create({
        category: req.body.category,
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
        image: req.file ? req.file.filename : "default-image.png",
      })
        .then(() => {
          let new_id = db.Product.findAll().then(
            (result) => result[result.length - 1].id
          );
          new_id.then((R) => {
            db.Users_Products.create({
              user_id: req.session.usuarioLogueado.id,
              product_id: R,
            });
          });
        })
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => res.send(error));
    } else {
      db.Category.findAll()
      .then(category => {
        res.render("product-create-form", {
          category: category ,
          errors: errors.array(),
          old: req.body,
        });
      })
    }
  },

  edit: async (req, res) => {
    const id = req.params.id;
    const product = await db.Product.findByPk(id, { include: [{ all: true }] });
    const category = await db.Category.findAll();
    res.render("product-edit-form", { product: product, category: category });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const product = await db.Product.findByPk(id);
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const id = req.params.id;
      db.Product.update(
        {
          category: req.body.category,
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
          image: req.file ? req.file.filename : product.image
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
  description: async (req, res) => {
    const id = req.params.id;
    const category = await db.Category.findAll();
    const product = db.Product.findByPk(id).then((product) => {
      edit_delete = req.session.usuarioLogueado != undefined;
      if (edit_delete) {
        db.Users_Products.findAll({
          where: {
            user_id: req.session.usuarioLogueado.id,
          },
        })
          .then((prods) => prods.filter((prod) => prod.product_id == id))
          .then((result) => {
            if (result.length == 0) {
              edit_delete = false;
            } else {
              edit_delete = true;
            }
            res.render("description", {
              product: product,
              category: category,
              edit_delete: edit_delete,
            });
          });
      } else {
        res.render("description", {
          product: product,
          category: category,
          edit_delete: edit_delete,
        });
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
