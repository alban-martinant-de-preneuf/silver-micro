const Restaurant = require('../models/restaurant');
const Availability = require('../models/availability');

exports.isRestaurantOwner = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.restaurantId });
        if (restaurant.owner != req.auth.userId) {
            throw 'Vous n\'êtes pas le propriétaire de ce restaurant';
        }
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
}

exports.isAvailabilityOwner = async (req, res, next) => {
    try {
        const availabilitity = await Availability.findOne({ _id: req.params.id });
        const restaurant = await Restaurant.findOne({ _id: availabilitity.restaurant });
        if (restaurant.owner != req.auth.userId) {
            throw 'Vous n\'êtes pas le propriétaire du restaurant associé à cette disponibilité';
        }
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
}