const router = require('express').Router();
const adminController = require('../controllers/adminController');
const validetorMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*get*/   
router.get('/', authMiddleware.oturumAcilmis, adminController.showHomePage);
//İstasyon Ekle
router.get('/addStation', authMiddleware.oturumAcilmis, adminController.addStation);
router.post('/addStationPost', authMiddleware.oturumAcilmis, adminController.addStationPost);
// Sefer Ekle
router.get('/addTrip', authMiddleware.oturumAcilmis, adminController.addTrip);
router.post('/addTripPost', adminController.addTripPost);
//Kullanıcı Ekle
router.get('/addUser', authMiddleware.oturumAcilmis, adminController.addUser);
router.post('/addUserPost', authMiddleware.oturumAcilmis, adminController.addUserPost);

module.exports = router;