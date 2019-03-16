const uModel = require('../../schemas/users');
exports.createUser = async (req, res, next) => {

};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Array<JSON>} users array
 */
exports.getUsers = async (req, res, next) => {
    try {
        let users = await uModel.getUserAndWallets();
        res.sendResponse({ users }, 200, 'Users fetched successfully');
    }
    catch (ex) {
        next(ex);
    }
};
exports.getSingleUser = async (req, res, next) => {

};
exports.updateUser = async (req, res, next) => {

};
exports.deleteUser = async (req, res, next) => {

};