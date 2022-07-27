const db = require("../../data/models");

const productsApiController = {
  list: (req, res) => {
    db.Product.findAll({
      attributes: [
        "id",
        [
          db.Product.sequelize.fn(
            "CONCAT",
            db.Product.sequelize.col("brand"),
            " ",
            db.Product.sequelize.col("model")
          ),
          "name",
        ],
        "description",
        [
          db.Product.sequelize.fn(
            "CONCAT",
            "localhost:3000/api/products/",
            db.Product.sequelize.col("id")
          ),
          "detail",
        ],
      ],
    }).then((products) => {
      return res.status(200).json({
        count: products.length,
        users: products,
      });
    });
  },
  show: (req, res) => {
    db.Product.findByPk(req.params.id, {
      attributes: [
        "id",
        "brand",
        "model",
        "manufacture_year",
        "color",
        "door_number",
        "transmission",
        "motor_type",
        "description",
        "price",
        "discount",
        [
          db.Product.sequelize.fn(
            "CONCAT",
            "/img/products-img/",
            db.Product.sequelize.col("image")
          ),
          "image",
        ],
      ],
    }).then((product) => {
      res.status(200).json(product);
    });
  },
};

module.exports = productsApiController;
