module.exports = (sequelize, dataTypes) => {
    let alias = "Users_Products";
  
    let cols = {
      id: {
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: dataTypes.BIGINT(10),
        allowNull: false,
      },
      product_id: {
        type: dataTypes.BIGINT(10),
        allowNull: false,
      }
    };
  
    let config = {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    };
  
    const Users_Products = sequelize.define(alias, cols, config);
  
    return Users_Products;
  };