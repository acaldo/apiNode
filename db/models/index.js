const { User, UserSchema } = require('./usersModel');
const { Product, ProductSchema } = require('./productsModel');
const { Category, CategorySchema } = require('./categoriesModel');
const { Costumer, CostumerSchema } = require('./costumersModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Costumer.init(CostumerSchema, Costumer.config(sequelize));

  User.associate(sequelize.models);
  Costumer.associate(sequelize.models);
}

module.exports = setupModels;
