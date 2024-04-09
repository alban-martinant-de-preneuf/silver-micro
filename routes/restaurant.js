const express = require('express');
const router = express.Router();

const restaurantCtrl = require('../controllers/restaurant');
const tableCtrl = require('../controllers/table');
const auth = require('../middleware/auth');

router.get('/', auth, restaurantCtrl.getAllRestaurants);
router.get('/:id', auth, restaurantCtrl.getOneRestaurant);

router.post('/register', auth, restaurantCtrl.register);
router.post('/:restaurantId/table', auth, tableCtrl.createTable);

// todo
// router.put('/:id', auth, restaurantCtrl.updateRestaurant);
// router.put('/:id/table/:tableId', auth, tableCtrl.updateTable);
// router.get('/:id/table', auth, restaurantCtrl.getAllTables);
// router.get('/:id/table/:tableId', auth, restaurantCtrl.getOneTable);

module.exports = router;