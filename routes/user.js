var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require('../database/relation');
const {authenticateUser} = require("../middlewares/auth"); // Adjust the path based on your actual file structure

function generateToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

//Permet de créer un compte à un visiteur
router.post('/signup', async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password || !body.role) {
        res.status(400).send("Tous les champs sont obligatoires");
        return;
    }

    if (body.password.length < 8) {
        res.status(400).send("MDP doit avoir au moins 8 symboles");
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(body.password, 12);

        const user = await User.create({
            email: body.email,
            password: hashedPassword,
            role: "client"
        });
        res.json(user)
        res.status(201).send("Utilisateur créé: " + body.email);
    } catch (error) {
        console.error("Erreur lors de la création :", error);
        res.status(500).send("Erreur lors de la création : " + error.message);
    }
});

//Permet de se connecter a son compte et de créer un token
router.post('/login', async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        res.status(400).send("Tous les champs sont obligatoires");
        return;
    }

    try {
        const user = await User.findOne({ where: { email: body.email } });

        if (!user) {
            res.status(400).send("Invalid password or email");
            return;
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            res.status(400).send("Invalid password or email");
        } else {
            delete user.password;

            // Generate a JWT Token
            return res.json({
                'token': generateToken(user.id),
                'user': user,
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login: " + error.message);
    }
});

module.exports = router;
