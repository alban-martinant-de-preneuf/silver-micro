const express = require('express');
const router = express.Router();

const tableCtrl = require('../controllers/table');

router.get('/:id', tableCtrl.getOneTable);
router.get('/:tableId/availabilities', tableCtrl.getAvailabilities);

module.exports = router;