const Restaurant = require('../models/restaurant');

exports.register = (req, res, next) => {
    console.log(req.body);
    const restaurant = new Restaurant({
        owner: req.auth.userId,
        name: req.body.name,
        address: req.body.address,
        postal_code: req.body.postal_code,
        city: req.body.city
    });
    restaurant.save()
        .then(() => res.status(201).json({ message: 'Restaurant créé !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find()
        .then(restaurants => res.status(200).json(restaurants))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneRestaurant = (req, res, next) => {
    Restaurant.findOne({ _id: req.params.id })
        .then(restaurant => res.status(200).json(restaurant))
        .catch(error => res.status(404).json({ error }));
}