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
const bcrypt = require("bcrypt");

//Ajouter un produit si on est admin
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

//Supprimer un produit si on est admin
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

//Modifier un produit si on est admin
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

//Voir les utilisateurs si on est admin
router.get('/users', async function(req, res, next) {
    const user = await User.findByPk(authenticateUser(req));
    if(user.role === 'admin') {
        const body = req.body;
        const id = req.params.id;
        try{
            const users = await User.findAll()
            res.json(users);
        } catch (error) {
            res.send("Il y a eu une erreur", error)
        }
    } else {
        res.send("Vous n'avez pas les autorisations pour accéder à ce lien")
    }
})

//Ajouter un nouvelle admin si on est admin
router.post('/user/new', async function(req, res){
    const user = await User.findByPk(authenticateUser(req));
    if(user.role === 'admin') {
        const body = req.body;
        try {
            const hashedPassword = await bcrypt.hash(body.password, 12);
            const user = await User.create({
                email: body.email,
                password: hashedPassword,
                role: "admin",
            })
            res.json(user)
        } catch (error) {
            res.send("Il y a eu une erreur lors de la création de l'admin", error)
        }

    } else {
        res.send("Vous n'avez pas les autorisations pour accéder à ce lien")
    }
});

module.exports = router;