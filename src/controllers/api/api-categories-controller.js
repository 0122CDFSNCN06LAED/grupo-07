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
};

module.exports = categoriesApiController;
