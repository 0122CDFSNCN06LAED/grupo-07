const db = require("../../data/models");

const categoriesApiController = {
  list: (req, res) => {
    db.Category.findAll({
      attributes: ["id", "cat"],
    }).then((categories) => {
      return res.status(200).json({
        count: categories.length,
        categories: categories,
      });
    });
  },
  detail: async (req, res) => {
    db.Category.findAll({
      include: { model: db.Product, required: true, as: "products"},
      attributes: ["id", "cat"],
    }).then((categories) => {
      console.log(categories[1].products.length)
      return res.status(200).json({
        count: categories.length,
        categories: categories,
      });
    });
  },
};

module.exports = categoriesApiController;
