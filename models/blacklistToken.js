const mongoose = require('mongoose');

const blacklistTokenSchema = mongoose.Schema({
    token: { type: String, required: true, unique: true },
    expirationDate: { type: Date, required: true }
})

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);