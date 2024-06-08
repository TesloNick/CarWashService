const { QueryTypes, Sequelize } = require("sequelize");
const { Order } = require("../models/models")

const sequelize = require('../db')

class orderController{
    
    async getAllOrders(req, res, next) {
        const orders = await Order.findAll({
            attributes: ['id', 'orderDate', 'sum', 'userId', 'usercarId'],
        }); 
            return res.json(orders)
    }

    async getAllOrdersByUser(req, res, next) {
        
        const {userId} = req.params

        /*const result = await Service.findAll({
            where: {id: userId},
            attributes: ['id', 'orderDate', 'sum', 'userId', 'usercarId'],
        }); 
            return res.json(result)*/
        
        const records = await sequelize.query(
            'SELECT ord.id, ord."orderDate" ,ord."sum", u."name" ,u.lastname ,u.email , uc."carNumber" , c.brand ,c.model ,c."class" FROM public.orders as ord inner join PUBLIC.users u on ord."userId" = u.id inner join PUBLIC.usercars uc on uc.id = ord."usercarId" inner join PUBLIC.cars c on c.id = uc."carId" and ord."userId" = $userid0',    
            {   
                bind: { userid0: userId },
                type: QueryTypes.SELECT,
            },
            );
                return res.json(records)
    }

    async createOrder(req, res, next) {
        /*{
            "id": 1,
            "orderDate": "2024-04-04T14:00:00.000Z",
            "sum": 5000,
            "userId": 1,
            "usercarId": 1
          }*/
          
        //Order.build({ sum: '500', userId: '1', usercardId: '1', orderDate: '2024-04-04T14:00:00.000Z'});
        //console.log(req.params.sum)
        let {orderDate, sum, userId, usercarId } = req.body
        const order = await Order.create({orderDate, sum, userId, usercarId })


        return res.json(order)
    }
    
}

module.exports = new orderController()