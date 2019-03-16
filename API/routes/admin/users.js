
let router = require('express').Router();
let pController = require('../../controllers/admin/users');
let auth = require('../../middlewares/auth');
router
    .post('/', pController.createUser)
    .get('/', pController.getUsers)
    .get('/:id', pController.getSingleUser)
    .put('/:id', pController.updateUser)
    .get('/delete/:id', pController.deleteUser);
module.exports = router;