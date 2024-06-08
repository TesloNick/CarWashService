const { Car, UserCar } = require("../models/models")
const { QueryTypes } = require('sequelize');
const sequelize = require('../db')

class carController{
    
    async getAllCars(req, res, next) {
        //console.log('CARSSSSSSSSSSSSSSSSSSSSS')
        const cars = await Car.findAll({
            attributes: ['id', 'brand', 'model', 'class'],
        }); 
            //*/console.log(services.every(ser => ser instanceof Service));
            //console.log('All users:', JSON.stringify(services, null, 2));*/
            return res.json(cars)
    }

    async getAllUserCar(req, res, next) {

        const {userId} = req.params
        /*const cars = await UserCar.findAll({
            where: {userId},
            attributes: ['id', 'carNumber', 'userId', 'carId', 'brand', 'model', 'class'],
        }); */


        /*const carInfo = await Car.findAll({
            where: {cars},
            attributes: ['id', 'brand', 'model', 'class'],
        }); */


        
const records = await sequelize.query(
'SELECT * FROM (SELECT uc."carNumber", uc."userId", c."brand", c."model", c."class", uc."carId",uc."id" as isercarId FROM public.usercars as uc inner join PUBLIC.users u on uc."userId" = u.id inner join PUBLIC.cars c on c.id = uc."carId" AND uc."userId" = $userid0)',
//'SELECT * FROM (SELECT uc."carNumber", uc."userId", uc."carId" FROM public.usercars as uc inner join PUBLIC.users u on uc."userId" = u.id inner join PUBLIC.cars c on c.id = uc."carId" AND uc."userId" = $userid0)',
{   
    bind: { userid0: userId },
    type: QueryTypes.SELECT,
},
);

        

        return res.json(records)

}
/*
await sequelize.query(
  'SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
  {
    bind: { status: 'active' },
    type: QueryTypes.SELECT,
  },
);*/












/*
    async test(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }*/

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

module.exports = new carController()