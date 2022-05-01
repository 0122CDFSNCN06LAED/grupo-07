const path = require("path");
const PRODUCTS = [
  {
    id: 1,
    name: "Ford Ka",
    description: "Detalle",
    price: 2770000,
  },
  {
    id: 2,
    name: "Ford Ka",
    description: "Detalle",
    price: 2770000,
  },
  {
    id: 3,
    name: "Ford Ka",
    description: "Detalle",
    price: 2770000,
  },
  {
    id: 4,
    name: "Ford Ka",
    description: "Detalle",
    price: 2770000,
  },
];

module.exports = {
  home: (req, res) => {
    res.render("index", {
      products: PRODUCTS,
    });
    //res.sendFile(path.join(__dirname, "../views/home.html"));
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
};
