const Router = require('express');

// API middlewares
const { createFinanceAPI, viewFinanceAPI, updateFinanceAPI, deleteFinanceAPI} = require('../api/finances.api');

// Inicializar router
const router = Router();

// Methods POST
router.post('/finances/createFinance', createFinanceAPI);

// Methods GET
router.get('/finances/viewFinance', viewFinanceAPI);

// Rutas put
router.put('/finances/updateFinance', updateFinanceAPI);

// Rutas delete
router.delete('/finances/deleteFinance', deleteFinanceAPI);

module.exports = router;