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

router.post('/', async function(req, res){
    const user = await User.findByPk(authenticateUser(req));
    if(user.role === 'admin') {
        const body = req.body;
        const product = await Products.create({
            title: body.title,
            description: body.description,
            price: body.price,
            stocks: body.stocks,
            tags: body.tags,
        })
        res.json(product)
    } else {
        res.send("Vous n'avez pas les autorisations pour accéder à ce lien")
    }
});

router.delete('/:id', async function(req, res){
    const user = await User.findByPk(authenticateUser(req));
    if(user.role === 'admin') {
        const body = req.body;
        const id = req.params.id;
        Products.destroy({
            where: {
                id: id,
            },
        })
            .then((rowsDeleted) => {
                if (rowsDeleted > 0) {
                    res.send(`Le panier:  ${id} à été supprimé.`)
                } else {
                    res.send(`Aucun panier n'a été trouvé avec cet l'id ${id}.`)

                }
            })
            .catch((error) => {
                res.send("Erreur lors de la suppression du panier")

            });
    } else {
        res.send("Vous n'avez pas les autorisations pour accéder à ce lien")
    }
});

router.patch('/:id', async function(req, res){
    const user = await User.findByPk(authenticateUser(req));
    if(user.role === 'admin') {
        const body = req.body;
        const id = req.params.id;
        const product = await Products.update({
            title:body.title,
            description: body.description,
            price: body.price,
            stocks: body.stocks,
            tags:body.tags,
        }, {
            where: {
                id: id,
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
    } else {
        res.send("Vous n'avez pas les autorisations pour accéder à ce lien")
    }
});

module.exports = router;