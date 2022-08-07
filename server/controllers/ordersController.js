const { Order } = require('../models/models');

class OrdersController {

    async createOrder(req, res, next){
        const {name, email, phone, address, cart, price} = req.body;
        const order = await Order.create({name, email, phone, address, cart, price})
        return res.json({order})
    }

    async getAll(req, res, next){
        const orders = await Order.findAll()
        return res.json({orders})
    }
}

module.exports = new OrdersController();
