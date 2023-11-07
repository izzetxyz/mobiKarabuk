const router = require('express').Router();
const adminController = require('../controllers/adminController');
const validetorMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*get*/   
router.get('/', authMiddleware.oturumAcilmis, adminController.showHomePage);


//ESKİ YAPI ERR
/* router.get('/begeni', authMiddleware.oturumAcilmis, adminController.actionPage);
router.get('/takipci', authMiddleware.oturumAcilmis, adminController.actionPage);
router.get('/kaydetme',authMiddleware.oturumAcilmis, adminController.actionPage);
router.post('/begeni', authMiddleware.oturumAcilmis, adminController.actionPage);
router.post('/takipci', authMiddleware.oturumAcilmis, adminController.actionPage);
router.post('/kaydetme', authMiddleware.oturumAcilmis,adminController.actionPage);
 */

module.exports = router;