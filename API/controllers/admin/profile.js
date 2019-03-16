const uModel = require('../../schemas/users');
const bcrypt = require('bcrypt');
const config = require('config');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getProfile = async (req, res, next) => {
    try {
        let user = req.session.user;
        res.render('admin/profile', { user, layout: 'aTemplate' });
    }
    catch (e) {
        next(err);
    }
};
/**
 * updating admin profile
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns updated profile information
 */
exports.updateProfile = async (req, res, next) => {
    try {
        let data = {};
        data.first_name = req.body.first_name;
        data.last_name = req.body.last_name;
        data.phone = req.body.phone;
        if (req.body.password && req.body.password.trim() != '' && req.body.password === req.body.cpassword) {
            console.log("TRUE = ", req.body.password.trim())
            data.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(config.get('bcryptSaltRounds')));
        }
        let user = await uModel.findOneAndUpdate({ _id: req.user._id }, data);
        res.sendResponse(data, 200, 'Users profile updated.');
    }
    catch (err) {
        next(err);
    }
};