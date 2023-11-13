const sequelize = require('./_database');

// Importation des models
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart')

User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });

// Synchronisation de la base
sequelize.sync({alter: false});

module.exports = {
    Product: Product,
    User: User,
    Cart: Cart,
};
