const router = require('express').Router();
const homeController = require('../controllers/homeController');
const multerConfig = require('../config/multerConfig');

//GET

router.get('/', homeController.homeShow);
router.get('/api/test',homeController.calculatePoint)


module.exports = router;