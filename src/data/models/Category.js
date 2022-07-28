module.exports = (sequelize, dataTypes) => {
  let alias = "Category";

  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    cat: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
  };

  let config = {
    tableName: "categories",
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category",
    });
  };

  return Category;
};
