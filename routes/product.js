const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Product } = require('../database/relation');
const {Op} = require("sequelize");
const auth = require('../middlewares/auth')
const {authenticateUser} = require("../middlewares/auth");
const User = require("../models/User");
const Cart = require('../models/Cart');
const Products = require('../models/Product')

router.get('/', async function(req, res){
    try {
        const products = await Products.findAll({
            attributes: {
                exclude: ['description']
            },
            where: {
                stocks: {[Op.gt]: 0},
            }
        });
        console.log(auth.authenticateUser(req))
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;