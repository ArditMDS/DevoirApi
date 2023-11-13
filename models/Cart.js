const sequelize = require('./_database');
const {DataTypes} = require("sequelize");

const Cart = sequelize.define('Cart', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Cart