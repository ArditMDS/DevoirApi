const sequelize = require('../database/_database');
const {DataTypes} = require("sequelize");

const Product = sequelize.define('Product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    stocks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    tags: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Product ;