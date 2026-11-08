const router = require('express').Router();
const ctrl = require('../controllers/evaluation.controller');

router.get('/list/:u_id', ctrl.list);
// router.get('/list/:u_role/:u_id', ctrl.edit);
// router.put('/list/:u_role/:u_id', ctrl.update);
// router.delete('/list/:u_role/:u_id', ctrl.delete);
router.post('/create', ctrl.create);

module.exports = router;