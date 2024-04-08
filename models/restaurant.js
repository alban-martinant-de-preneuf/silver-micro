const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    postal_code: { type: String, required: true },
    city: { type: String, required: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);