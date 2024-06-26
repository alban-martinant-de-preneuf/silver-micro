const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    capacity: { type: Number, required: true },
    name: { type: String },
    infos: { type: String },
    availabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Availability' }]
});

module.exports = mongoose.model('Table', tableSchema);