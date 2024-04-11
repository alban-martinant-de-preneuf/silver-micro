const Table = require('../models/table');
const Restaurant = require('../models/restaurant');
const Availability = require('../models/availability');
const availability = require('../models/availability');

exports.createTable = (req, res, next) => {
    const table = new Table({
        name: req.body.name,
        capacity: req.body.capacity,
        infos: req.body.infos
    });
    table.save()
        .then(() => {
            Restaurant.updateOne(
                { _id: req.params.restaurantId },
                { $push: { tables: table._id } }
            )
                .then(() => res.status(201).json({ message: 'Table créée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

exports.getAllTablesOfRestaurant = (req, res, next) => {
    Restaurant.findOne({ _id: req.params.restaurantId })
        .select('tables')
        .populate('tables')
        .then(restaurant => res.status(200).json(restaurant.tables))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneTable = (req, res, next) => {
    Table.findOne({ _id: req.params.id })
        .then(table => res.status(200).json(table))
        .catch(error => res.status(404).json({ error }));
}

exports.getAvailabilities = (req, res, next) => {
    const query = { _id: req.params.tableId };

    Table.findOne(query)
        .select('availabilities')
        .populate('availabilities')
        .then(table => {
            if (req.query.startTime) {
                table.availabilities = table.availabilities.filter(availability => {
                    return availability.startTime >= new Date(req.query.startTime);
                });
            }
            if (req.query.endTime) {
                table.availabilities = table.availabilities.filter(availability => {
                    return availability.endTime <= new Date(req.query.endTime);
                });
            }
            res.status(200).json(table.availabilities);
        })
        .catch(error => {
            res.status(400).json({ "error": error.message });
        });
}
