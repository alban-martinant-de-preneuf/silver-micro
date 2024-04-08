const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken');

async function isTokenBlacklisted(token) {
    const blacklistedToken = await BlacklistToken.findOne({ token: token });
    return !!blacklistedToken;
}

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw 'Token manquant';
        }
        if (await isTokenBlacklisted(token)) {
            throw 'Token invalide';
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res
            .clearCookie('token')
            .status(401)
            .json({ error: error });
    }
};