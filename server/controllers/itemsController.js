const { Item } = require('../models/models');

class ItemsController {

    async postIMG(req, res, next){
        const file = req.files.file
        const path = "public/" + file.name;
        file.mv(path, (err) => {
            if (err) {
                console.log(err)
                return res.status(400);
            }
                return res.status(200);
          });
    }

    async create(req, res, next){
        const {brand, name, img, price} = req.body;
        const candidat = await Item.findOne({where:{name:name}})
        if(candidat){
            return res.json({message: "The item is already in the database"})
        }else{
            const item = Item.create({brand, name, img, price})
            return res.json(item)
        }
    }

    async getAll(req, res, next){
        const items = await Item.findAll()
        return res.json(items)
    }

    async getForBrand(req, res, next){
        const items = await Item.findAll({where:{brand:req.params.brand}})
        return res.json(items)
    }

    async getBrands(req, res, next) {
        const brands = await Item.findAll({ attributes: ['brand'], group: 'brand' });
        return res.json(brands);
    }
}

module.exports = new ItemsController();