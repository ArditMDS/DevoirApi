const sequelize = require('../database/_database');
const {DataTypes} = require("sequelize");

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.TEXT,
    },
})

module.exports = User ;