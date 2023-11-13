// Ce fichier contient les middleware relatif à l'authentification
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function authenticateUser(req, res, next){
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract and return the user ID
        const userId = decoded.id;
        return userId;
    } catch (error) {
        // Handle decoding errors (e.g., invalid token)
        console.error('Error decoding token:', error);
        return null;
    }
}

module.exports = {
    authenticateUser: authenticateUser
}