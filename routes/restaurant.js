const express = require('express');
const router = express.Router();

const restaurantCtrl = require('../controllers/restaurant');
const tableCtrl = require('../controllers/table');
const auth = require('../middleware/auth');
const checks = require('../middleware/checks');

router.get('/', restaurantCtrl.getAllRestaurants);
router.get('/:id', restaurantCtrl.getOneRestaurant);
router.post('/register', auth, restaurantCtrl.register);
router.post(
    '/:restaurantId/tables',
    auth,
    checks.isRestaurantOwner,
    tableCtrl.createTable
);
router.get('/:restaurantId/tables', tableCtrl.getAllTablesOfRestaurant);
router.post(
    '/:restaurantId/availabilities',
    auth,
    checks.isRestaurantOwner,
    restaurantCtrl.createAvailability
);

module.exports = router;