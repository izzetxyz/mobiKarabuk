const router = require('express').Router();
const homeController = require('../controllers/homeController');
const multerConfig = require('../config/multerConfig');

//GET

router.get('/', homeController.homeShow);

module.exports = router;