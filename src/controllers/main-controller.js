const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../data/carrousel-products.json");
const PRODUCTS = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));



module.exports = {
  home: (req, res) => {
    res.render("index", {
      products: PRODUCTS,
    });
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render( "login");
  },
  carrito: (req, res) => {
  },
  description: (req, res) => {
    res.render("login");
  },
  
};