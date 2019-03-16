let router = new require('express').Router();
let CWController = require('../../controllers/admin/currencyWallet');
router
    .get('/getTransactions', CWController.getTransactions)
    .get('/getCurrencyLookup', CWController.getCurrencyLookup)
    .put('/updateCurrencyLookup', CWController.updateCurrencyLookup);
    
module.exports = router;