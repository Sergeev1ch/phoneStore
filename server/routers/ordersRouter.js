const Router = require('express');
const ordersController = require('../controllers/ordersController.js');

const router = new Router();

router.post('/create', ordersController.createOrder);
router.get('/getAll', ordersController.getAll);

module.exports = router;