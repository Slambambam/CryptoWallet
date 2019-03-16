const uModel = require('../schemas/users');
const authUser = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) throw new Error('Token not found.');
        let user = await uModel.findOne({ 'access_token.token': token, roles: 'user' });
        if (user === null) throw new Error('User not found.');
        req.user = user;
        next();
    }
    catch (ex) {
        next(ex);
    }
};
const authAdmin = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) throw new Error('Token not found.');
        let user = await uModel.findOne({ 'access_token.token': token });
        if (user === null) throw new Error('User not found.');
        if (user.roles.indexOf('admin') === -1) throw new Error('Invalid Role.');
        req.user = user;
        next();
    }
    catch (ex) {
        next(ex);
    }
};
module.exports = { authUser, authAdmin };