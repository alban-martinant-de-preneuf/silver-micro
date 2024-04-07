const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const userRoutes = require('./routes/user')

mongoose.connect('mongodb://localhost:27017/silver_micro?retryWrites=true&w=majority',
    {
        authSource: 'admin',
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PWD
    })
    .then(() => console.log('Connexion à MongoDB réussie.'))
    .catch((e) => console.log('Connexion à MongoBD échouée !', e));

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self';");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;