const sequelize = require('../database/_database');

// Importation des models
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart')

User.belongsToMany(Product, {through: Cart});
Product.belongsToMany(User, {through: Cart});

// Synchronisation de la base
sequelize.sync({alter: true});

module.exports = {
    Product: Product,
    User: User,
    Cart: Cart,
};
