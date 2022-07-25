const db = require("../../data/models");

const usersApiController = {
  list: (req, res) => {
    db.User.findAll({
      attributes: [
        "id",
        [
          db.User.sequelize.fn(
            "CONCAT",
            db.User.sequelize.col("first_name"),
            " ",
            db.User.sequelize.col("last_name")
          ),
          "name",
        ],
        "email",
        [
          db.User.sequelize.fn(
            "CONCAT",
            "localhost:3000/api/users/",
            db.User.sequelize.col("id")
          ),
          "detail",
        ],
      ],
    }).then((users) => {
      return res.status(200).json({
        count: users.length,
        users: users,
      });
    });
  },
  show: (req, res) => {
    db.User.findByPk(req.params.id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "birth_date",
        [
          db.User.sequelize.fn(
            "CONCAT",
            "/img/user-img/",
            db.User.sequelize.col("avatar")
          ),
          "image",
        ],
      ],
    }).then((user) => {
      res.status(200).json(user);
    });
  },
};

module.exports = usersApiController;
