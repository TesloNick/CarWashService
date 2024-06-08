const { Service } = require("../models/models")

class serviceController{
    
    async getAllServices(req, res, next) {
        //console.log('111111111')
        const services = await Service.findAll({
            attributes: ['id', 'name', 'price', 'description', 'class'],
        }); 
            
            //*/console.log(services.every(ser => ser instanceof Service));
            //*/console.log(services.every(ser => ser instanceof Service));
            //console.log('All users:', JSON.stringify(services, null, 2));*/
            return res.json(services)
    }

    async getServicesByClass(req, res, next) {
        
        const {carClass} = req.params
        const result = await Service.findAll({
            where: {class: carClass},
            attributes: ['id', 'name', 'description', 'price', 'class'],
        }); 
            return res.json(result)
    }

    /*async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }*/

}

module.exports = new serviceController()