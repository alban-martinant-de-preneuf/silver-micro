const Restaurant = require('../models/restaurant');

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