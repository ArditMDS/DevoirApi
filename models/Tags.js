const sequelize = require('../database/_database');
const {DataTypes} = require("sequelize");
const Product = require('./Product')

const Tags = sequelize.define('Tags', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
})

Tags.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Tags, { foreignKey: 'productId' });

module.exports = Tags ;