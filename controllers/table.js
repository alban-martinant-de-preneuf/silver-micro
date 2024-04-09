const Table = require('../models/table');
const Restaurant = require('../models/restaurant');

exports.createTable = (req, res, next) => {
    const table = new Table({
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