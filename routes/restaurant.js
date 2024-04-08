const express = require('express');
const router = express.Router();

const restaurantCtrl = require('../controllers/restaurant');
const auth = require('../middleware/auth');

router.post('/register', auth, restaurantCtrl.register);
router.get('/', auth, restaurantCtrl.getAllRestaurants);
router.get('/:id', auth, restaurantCtrl.getOneRestaurant);

module.exports = router;