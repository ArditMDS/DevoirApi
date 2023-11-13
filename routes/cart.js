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

router.post('/add/:id', async function(req, res, next)  {
    const productId = req.params.id;
    const quantity = req.query.quantity;
    const product = await Product.findByPk(productId);
    if(product.stocks > 0) {
        try {
            const user = await User.findByPk(authenticateUser(req));
            if(user.role !== "visiteur") {
                const cart = await Cart.create({
                    userId: user.id,
                    productId: productId,
                    quantity: quantity,
                })
                res.json(cart)
            } else {
                console.error('Error fetching tasks');
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.send("L'article n'est plus en stock")
    }

})

router.delete('/:id', async function(req, res, next) {
    const cartId = req.params.id;
    Cart.destroy({
        where: {
            cartId: cartId,
        },
    })
        .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                res.send(`Le panier:  ${cartId} à été supprimé.`)
            } else {
                res.send(`Aucun panier n'a été trouvé avec cet l'id ${cartId}.`)

            }
        })
        .catch((error) => {
            res.send("Erreur lors de la suppression du panier")

        });
})

router.patch('/:id', async function(req, res, next) {
    const body = req.body;
    const id = req.params.id
    const cart = await Cart.update({quantity: body.quantity}, {
        where: {
            cartId: id,
        }
    }) .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            res.send(`Le panier:  ${id} à été modifié.`)
        } else {
            res.send(`Aucun panier n'a été trouvé avec cet l'id ${id}.`)

        }
    })
        .catch((error) => {
            res.send("Erreur lors de la modification du panier")

        });
})

module.exports = router;