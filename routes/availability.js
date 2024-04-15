const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const checks = require('../middleware/checks');

const availabilityCtrl = require('../controllers/availability');

router.get('/', auth, availabilityCtrl.getUserAvailabilities);
router.get('/:id', availabilityCtrl.getOneAvailability);
router.put('/:id/book', auth, availabilityCtrl.bookAvailability);
router.delete('/:id/cancel', auth, checks.isAvailabilityUser, availabilityCtrl.cancelBooking);
router.put('/:id', auth, checks.isAvailabilityOwner, availabilityCtrl.modifyAvailability);

module.exports = router;