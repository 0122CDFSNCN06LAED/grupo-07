const path = require("path");
const fs = require("fs");

const db = require("../data/models");



module.exports = {
  home: (req, res) => {

    db.Product.findAll({
      limit: 3
    }).then((product) => {
      res.render('index', {
        products: product
      })
    })
  },
  carrito: (req, res) => {
  }  
};