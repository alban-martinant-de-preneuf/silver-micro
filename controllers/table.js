const Table = require('../models/table');
const Restaurant = require('../models/restaurant');

exports.createTable = async (req, res, next) => {
    try {
        const table = new Table({
            name: req.body.name,
            capacity: req.body.capacity,
            infos: req.body.infos
        });
        await table.save();
        await Restaurant.updateOne(
            { _id: req.params.restaurantId },
            { $push: { tables: table._id } }
        );
        res.status(201).json({ message: 'Table créée !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllTablesOfRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.restaurantId })
            .select('tables')
            .populate('tables');
        res.status(200).json(restaurant.tables);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getOneTable = async (req, res, next) => {
    try {
        const table = await Table.findOne({ _id: req.params.id });
        if (!table) {
            throw new Error('Table non trouvée !');
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

exports.getAvailabilities = async (req, res, next) => {
    try {
        const table = await Table.findOne({ _id: req.params.tableId })
            .select('availabilities')
            .populate('availabilities');
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
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
