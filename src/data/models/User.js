module.exports = (sequelize, dataTypes) => {
  let alias = "User";

  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    first_name: {
      type: dataTypes.STRING(50),
      allowNull: false,
      len: 2,
    },
    last_name: {
      type: dataTypes.STRING(50),
      allowNull: false,
      len: 2,
    },
    username: {
      type: dataTypes.STRING(50),
      allowNull: false,
      len: 2,
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    birth_date: {
      type: dataTypes.DATEONLY,
      allowNull: false,
    },
    avatar: {
      type: dataTypes.STRING(200),
      allowNull: true,
    },
  };

  let config = {
    tableName: "users",
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsToMany(models.Product, {
      as: "users",
      through: "users_products",
      foreignKey: "user_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };

  return User;
};
