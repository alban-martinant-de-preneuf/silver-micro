const Availability = require('../models/availability');

exports.getUserAvailabilities = async (req, res, next) => {
    try {
        const query = { user: req.auth.userId, status: "reserved" };
        req.query.startTime ? query.startTime = { $gte: new Date(req.query.startTime) } : null;
        req.query.endTime ? query.endTime = { $lte: new Date(req.query.endTime) } : null;
        const availabilities = await Availability.find(query);
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getOneAvailability = async (req, res, next) => {
    try {
        const availability = await Availability.findOne({ _id: req.params.id });
        res.status(200).json(availability);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

exports.bookAvailability = async (req, res, next) => {
    try {
        const availability = await Availability.findOne({ _id: req.params.id });
        if (availability.status !== 'available') {
            throw new Error('La disponibilité est déjà réservée ou en attente !');
        }
        if (!req.body.numberOfPeople) {
            throw new Error('Vous devez préciser le nombre de personnes !');
        }
        availability.status = 'reserved';
        availability.user = req.auth.userId;
        availability.numberOfPeople = req.body.numberOfPeople;
        req.body.infos ? availability.infos = req.body.infos : null;
        await availability.save();
        res.status(200).json({ message: 'Réservation effectué' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.cancelBooking = async (req, res, next) => {
    try {
        const availability = await Availability.findOne({ _id: req.params.id });
        if (availability.status !== 'reserved') {
            throw new Error('La disponibilité n\'est pas réservée !');
        }
        availability.status = 'available';
        availability.user = null;
        availability.numberOfPeople = null;
        availability.infos = null;
        await availability.save();
        res.status(200).json({ message: 'Réservation annulée' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.modifyAvailability = async (req, res, next) => {
    try {
        const updates = {
            numberOfPeople: req.body.numberOfPeople,
            infos: req.body.infos,
            status: req.body.status
        };
        for (let key in updates) {
            if (!updates[key]) {
                delete updates[key];
            }
        }
        await Availability.findByIdAndUpdate(
            req.params.id,
            updates,
            { runValidators: true }
        );
        res.status(200).json({ message: 'Réservation modifiée !' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}