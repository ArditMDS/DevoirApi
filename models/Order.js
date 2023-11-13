/*
const sequelize = require('../database/_database');
const {DataTypes} = require("sequelize");
const User = require("./User");
const Product = require("./Product");

const Order = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    orderUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    orderProductId: {
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
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Order ;
*/