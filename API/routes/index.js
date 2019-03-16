let router = require('express').Router();
let auth = require('../middlewares/auth');
let wHelper = require('../helpers/wallet');
let indexController = require('../controllers/users/index');
router
    .post('/api/users/login', indexController.login)
    .post('/api/users/register', indexController.register)
    .post('/api/forgotPassword', async (req, res, next) => {
        try {
            let user = await uModel.resetPassword(req.body.email);
            res.sendResponse({}, 'Password has been successfully reset.');
        }
        catch (ex) {
            next(ex);
        }
    })
    .post('/api/transaction', indexController.notifyTransaction)
    .use('/api/users', auth.authUser, require('./users/index'))
    .use('/api/admin', require('./admin/index'))
    .get('/logout', (req, res, next) => {
        delete req.session.user;
        res.redirect('/users/login');
    })
    .get('/users/login', async (req, res, next) => {
        let login_error = req.session.login_error;
        let register_sucesss = req.session.register_sucesss;
        delete req.session.login_error;
        delete req.session.register_sucesss;
        res.render('users/login', { layout: 'noauth', login_error, register_sucesss })
    })
    .get('/api/users/register', async (req, res, next) => {
        let register_error = req.session.register_error;
        delete req.session.register_error;
        res.render('users/register', { layout: 'noauth', register_error })
    })
module.exports = router;