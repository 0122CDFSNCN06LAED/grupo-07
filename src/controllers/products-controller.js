const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const PRODUCTS = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

module.exports = {
  index: (req, res) => {
    res.render("products", {
      products: PRODUCTS,
    });
  },
  create: (req, res) => {
    res.render("product-create-form");
  },
  store: (req, res) => {
    const data = req.body;
    res.send(console.log(data));
    const newId =
      PRODUCTS.reduce((acc, p) => {
        return p.id > acc ? p.id : acc;
      }, 0) + 1;
    const product = {
      ...req.body,
      id: newId,
      // image: req.file.filename
      image: "carousel-1.png",
    };
    PRODUCTS.push(product);
    const jsonTxt = JSON.stringify(PRODUCTS, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");
    res.redirect("/products");
  },
  edit: (req, res) => {
    res.render("product-edit-form");
  },
  description: (req, res) => {
    res.render("description");
  },
};
