
let router = require('express').Router();
let indexController = require('../../controllers/admin/index');
let auth = require('../../middlewares/auth');
router
    .get('/login', async (req, res, next) => {
        let login_error = req.session.login_error;
        delete req.session.login_error;
        res.render('admin/login', { layout: 'noauth', login_error })
    })
    .get('/dashboard', auth.authAdmin,async (req, res, next) => {
        res.render('admin/dashboard', { layout: 'aTemplate' })
    })
    .post('/login', indexController.login)
    .use('/users', auth.authAdmin, require('./users'))
    .use('/profile', auth.authAdmin, require('./profile'))
    .use('/currencyWallet', auth.authAdmin, require('./currencyWallet'))
module.exports = router;