const Restaurant = require('../models/restaurant');
const Availability = require('../models/availability');
const User = require('../models/user');

exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const restaurant = new Restaurant({
            owner: req.auth.userId,
            name: req.body.name,
            address: req.body.address,
            postal_code: req.body.postal_code,
            city: req.body.city
        });
        await User.findByIdAndUpdate(req.auth.userId, { $set: { role: 'restaurant_owner' } }, { new: true });
        console.log("role updated");
        await restaurant.save();
        res.status(201).json({ message: 'Restaurant créé !' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

exports.getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
}

exports.getOneRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.id });
        if (!restaurant) {
            throw new Error('Restaurant non trouvé !');
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

exports.getAvailabilities = async (req, res, next) => {
    try {
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
        const availabilities = await Availability.find(query);
        res.status(200).json(availabilities);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}
