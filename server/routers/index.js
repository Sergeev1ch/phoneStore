const Router = require('express');
const itemsRouter = require('./itemsRouter');
const ordersRouter = require('./ordersRouter');

const router = new Router();

router.use('/items', itemsRouter);
router.use('/orders', ordersRouter);

module.exports = router;