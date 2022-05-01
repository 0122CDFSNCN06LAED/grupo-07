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
  index: (req, res) => {
    res.render("products", {
      products: PRODUCTS,
    });
  },
  create: (req, res) => {
    res.render("product-create-form");
  },
  edit: (req, res) => {
    res.render("product-edit-form");
  },
  description: (req, res) => {
    res.render("description");
  },
};
