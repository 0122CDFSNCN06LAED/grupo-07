module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    brand: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    model: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    manufacture_year: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    door_number: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    transmission: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    motor_type: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(200),
      allowNull: true,
    },
    price: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    discount: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(200),
      allowNull: true,
    },
  };

  let config = {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsToMany(models.User, {
      as: "products",
      through: "users_products",
      otherKey: "user_id",
      foreignKey: "product_id",
      timestamps: false,
    });
  };


  return Product;
};
