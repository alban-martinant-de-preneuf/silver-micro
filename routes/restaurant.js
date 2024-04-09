const express = require('express');
const router = express.Router();

const restaurantCtrl = require('../controllers/restaurant');
const tableCtrl = require('../controllers/table');
const availabilityCtrl = require('../controllers/availability');
const auth = require('../middleware/auth');
const checks = require('../middleware/checks');

router.get('/', auth, restaurantCtrl.getAllRestaurants);
router.get('/:id', auth, restaurantCtrl.getOneRestaurant);

router.post('/register', auth, restaurantCtrl.register);
router.post('/:restaurantId/tables', auth, tableCtrl.createTable);
router.get('/:restaurantId/tables', auth, tableCtrl.getAllTablesOfRestaurant);

// router.get('/table/:tableId', auth, tableCtrl.getOneTable);

router.post(
    '/:restaurantId/availability',
    auth,
    checks.isRestaurantOwner,
    availabilityCtrl.createAvailability
);
// todo
// router.put('/:id', auth, restaurantCtrl.updateRestaurant);
// router.put('/:id/table/:tableId', auth, tableCtrl.updateTable);
// router.get('/:id/table', auth, restaurantCtrl.getAllTables);
// router.get('/:id/table/:tableId', auth, restaurantCtrl.getOneTable);

module.exports = router;