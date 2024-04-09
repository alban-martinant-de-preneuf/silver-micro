const Availability = require('../models/availability');
const Restaurant = require('../models/restaurant');

exports.createAvailability = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId).select('tables');
        const availability = new Availability({
            restaurant: req.params.restaurantId,
            dateTime: req.body.dateTime,
            duration: req.body.duration,
            tables: restaurant.tables
        });
        await availability.save();
        res.status(201).json({ message: 'Disponibilité créée !' });
    } catch (error) {
        res.status(400).json({ error });
    }
}