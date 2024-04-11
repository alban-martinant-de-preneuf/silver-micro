const Restaurant = require('../models/restaurant');
const Availability = require('../models/availability');
const User = require('../models/user');
const availability = require('../models/availability');

exports.register = (req, res, next) => {
    console.log(req.body);
    const restaurant = new Restaurant({
        owner: req.auth.userId,
        name: req.body.name,
        address: req.body.address,
        postal_code: req.body.postal_code,
        city: req.body.city
    });
    User.findByIdAndUpdate(req.auth.userId, { $set: { role: 'restaurant_owner' } }, { new: true })
        .then(() => {
            console.log("role updated")
        }).catch((err) => {
            console.error(err);
        })
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

exports.createAvailability = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.restaurantId }).select('tables').populate('tables');
        for (const table of restaurant.tables) {
            const availability = new Availability({
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                restaurant: req.params.restaurantId
            });
            await availability.save();

            table.availabilities.push(availability._id);

            await table.save();
        }
        res.status(201).json({ message: 'Disponibilité créée !' });
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.getAvailabilities = (req, res, next) => {
    const query = { restaurant: req.params.restaurantId };

    if (req.query.startTime) {
        query.startTime = { $gte: new Date(req.query.startTime) };
    }
    if (req.query.endTime) {
        query.endTime = { $lte: new Date(req.query.endTime) };
    }
    if (req.query.status) {
        query.status = req.query.status;
    }
    Availability.find(query)
        .then(availabilities => {
            res.status(200).json(availabilities);
        })
        .catch(error => {
            res.status(400).json({ "error": error.message });
        });
}
