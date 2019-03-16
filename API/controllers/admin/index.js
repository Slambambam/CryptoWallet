const uModel = require('../../schemas/users');
const wModel = require('../../schemas/wallet');
const tModel = require('../../schemas/transaction');
let walletService = require('../../lib/wallet');
/**
 * Login function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res, next) => {
    try {
        let user = await uModel.loginUser(req.body, 'admin');
        res.sendResponse(user, 200, 'User logged in successfully.');
    }
    catch (ex) {
        next(ex);
    }
};