const mongoose = require('mongoose');
const restaurant = require('./restaurant');

const availabilitySchema = mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: 'La date doit être dans le futur !'
        }
    },
    endTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startTime;
            },
            message: 'La date de fin doit être après la date de début !'
        },
        default: function () {
            return new Date(this.startTime.getTime() + 3600000);
        }
    },
    status: { type: String, enum: ['available', 'pending', 'reserved'], default: 'available', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    numberOfPeople: { type: Number, min: 1 },
    infos: { type: String },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
})

module.exports = mongoose.model('Availability', availabilitySchema);