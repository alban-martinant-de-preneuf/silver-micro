const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    capacity: { type: Number, required: true },
    name: { type: String },
    infos: { type: String }
});

module.exports = mongoose.model('Table', tableSchema);