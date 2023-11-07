const router = require('express').Router();
const homeController = require('../controllers/homeController');
const multerConfig = require('../config/multerConfig');

//GET

router.get('/', homeController.homeShow);

router.post('/api/postPhoto',multerConfig.single('xxx'),homeController.postPhoto)
module.exports = router;