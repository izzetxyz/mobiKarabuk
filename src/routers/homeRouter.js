const router = require('express').Router();
const homeController = require('../controllers/homeController');
const multerConfig = require('../config/multerConfig');

//GET

router.get('/', homeController.homeShow);
router.get('/api/test',homeController.calculatePoint)
router.get('/test',homeController.calistir)
router.get('/getWeather',homeController.getWeather)

router.post('/api/searchStation',homeController.searchStation)
router.post('/api/NasilGiderim',homeController.NasilGiderim)
router.post('/api/searchTrip',homeController.searchTrip)
router.post('/api/searchTripYon',homeController.searchTripYon)
router.post('/api/getNearestStation',homeController.getNearestStation)
module.exports = router;