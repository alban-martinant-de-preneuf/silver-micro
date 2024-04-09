const mongoose = require('mongoose');

const availabilitySchema = mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    dateTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: 'La date doit être dans le futur !'
        }
    },
    duration: { type: Number, required: true, min: 15, default: 60 },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }]
})

module.exports = mongoose.model('Availability', availabilitySchema);