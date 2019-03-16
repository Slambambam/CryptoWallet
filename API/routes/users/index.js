
let router = require('express').Router();
let indexController = require('../../controllers/users/index');
let CWRoutes = require('./currencyWallet');
router
    .use('/currencyWallet',(req, res, next)=>{console.log('IIII');next()}, require('./currencyWallet'))
    .use('/profile', require('./profile'))
    .get('/dashboard', indexController.dashboard)
    .get('/wallets', indexController.wallets)
    .get('/transactions', indexController.transaction)
    .post('/transact', indexController.transact)
    .get('/wallets/refresh', indexController.refreshWallet)
    .get('/receive', indexController.receive)
    .get('/send', indexController.send)
module.exports = router;