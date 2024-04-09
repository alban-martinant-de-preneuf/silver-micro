const mongoose = require('mongoose');

const availabilitySchema = mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }]
});

module.exports = mongoose.model('Availability', availabilitySchema);