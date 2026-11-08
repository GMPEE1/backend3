const router = require('express').Router();
const ctrl = require('../controllers/evaluation.controller');

router.get('/list/:u_id', ctrl.list);

router.post('/create', ctrl.create);
router.post('/createEvar/:u_id', ctrl.createEvar);

router.get('/comment/:u_id/:eva_id', ctrl.listCm);
router.post('/comment/:u_id', ctrl.createCm);

module.exports = router;