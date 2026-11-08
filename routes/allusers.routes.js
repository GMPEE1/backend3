const router = require('express').Router();
const ctrl = require('../controllers/allusers.controller');

router.get('/list/:u_role', ctrl.list);
router.get('/list/:u_role/:u_id', ctrl.edit);

module.exports = router;