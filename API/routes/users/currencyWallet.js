let router = new require('express').Router();
let CWController = require('../../controllers/users/currencyWallet');
router
    .post('/depositAmount', CWController.depositAmount)
    .post('/withdrawAmount', CWController.withdrawAmount)
    .post('/buyCrypto', CWController.buyCrypto)
    .post('/sellCrypto', CWController.sellCrypto)
    .get('/getTransactions', CWController.getTransactions)
    .get('/getCurrencyLookup', CWController.getCurrencyLookup);
    
module.exports = router;