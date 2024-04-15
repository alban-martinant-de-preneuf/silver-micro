const User = require('../models/user');
const BlacklistToken = require('../models/blacklistToken');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }

        res.cookie(
            'token',
            jwt.sign(
                { userId: user._id },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            ),
            {
                httpOnly: true,
                secure: true
            }
        );

        res.status(200).json({
            userId: user._id,
            message: 'Utilisateur connecté'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.logout = async (req, res, next) => {
    try {
        const expirationDate = new Date(Date.now() + 24 * 3600 * 1000);
        const blacklistToken = new BlacklistToken({
            token: req.cookies.token,
            expirationDate: expirationDate
        });

        await blacklistToken.save();

        res.clearCookie('token').status(200).json({ message: 'Utilisateur déconnecté' });
    } catch (error) {
        res.clearCookie('token').status(400).json({ error: error.message });
    }
};
