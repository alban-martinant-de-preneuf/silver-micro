const express = require('express');
const router = express.Router();

const tableCtrl = require('../controllers/table');

const auth = require('../middleware/auth');

router.get('/:id', auth, tableCtrl.getOneTable);
router.get('/:tableId/availabilities', auth, tableCtrl.getAvailabilities);
// router.post('/:tableId/reservation', auth, bookingCtrl.reserveTable);

module.exports = router;