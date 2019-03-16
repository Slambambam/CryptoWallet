
let router = require('express').Router();
let pController = require('../../controllers/users/profile');
router.get('/', pController.getProfile);
router.put('/', pController.updateProfile);
module.exports = router;