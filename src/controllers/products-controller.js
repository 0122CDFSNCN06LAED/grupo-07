const res = require("express/lib/response");
const path = require("path");

module.exports = {
  index: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/products.html"));
  },
  create: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product-create-form.html"));
  },
  edit: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product-edit-form.html"));
  },
};
