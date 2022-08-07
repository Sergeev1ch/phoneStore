const Router = require('express');
const itemsController = require('../controllers/itemsController.js');

const router = new Router();

router.post('/create', itemsController.create);
router.post('/postIMG', itemsController.postIMG);
router.get('/getAll', itemsController.getAll);
router.get('/getForBrand/:brand', itemsController.getForBrand);
router.get('/getBrands', itemsController.getBrands);

module.exports = router;