
let router = require('express').Router();
let pController = require('../../controllers/admin/profile');
router.get('/', pController.getProfile);
router.put('/', pController.updateProfile);
module.exports = router;