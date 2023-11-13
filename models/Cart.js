// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/_database');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Cart;
