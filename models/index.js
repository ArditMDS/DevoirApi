const sequelize = require('../database/_database');

// Importation des models
const Product = require('./Product');
const User = require('./User');
const Cart = require('./Cart')

User.belongsToMany(Product, {through: Cart});
Product.belongsToMany(User, {through: Cart});


// Synchronisation de la base
sequelize.sync({alter: false});

module.exports = {
    Product: Product,
    User: User,
    Cart: Cart,
};
