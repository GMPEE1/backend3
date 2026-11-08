const router = require('express').Router();
const ctrl = require('../controllers/topic.controller');

router.get('/list', ctrl.list);
router.get('/list/:t_id', ctrl.edit);
router.put('/list/:t_id', ctrl.update);
router.delete('/list/:t_id', ctrl.delete);
router.post('/list', ctrl.create);


module.exports = router;