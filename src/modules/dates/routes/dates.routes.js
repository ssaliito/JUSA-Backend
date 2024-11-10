const Router = require('express');

// API middlewares
const { createDateAPI, viewDatesAPI, updateDateAPI, deleteDateAPI} = require('../api/dates.api');

// Inicializar router
const router = Router();

// Methods POST
router.post('/date/createDate', createDateAPI);

// Methods GET
router.get('/date/viewDates', viewDatesAPI);

// Rutas put
router.put('/date/updateDate', updateDateAPI);

// Rutas delete
router.delete('/date/deleteDate', deleteDateAPI);

module.exports = router;