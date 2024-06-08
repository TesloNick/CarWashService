const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //автоинкрементация
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    phonenumber: {type: DataTypes.STRING(11)},
    //Login?
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //автоинкрементация
    orderDate: {type: DataTypes.DATE},
    sum: {type: DataTypes.INTEGER}, 
})

const UserCar = sequelize.define('usercar', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    carNumber: {type: DataTypes.STRING(8)},
    createdAt: false,
    updatedAt: false,
})

const Car = sequelize.define('car', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    class: {type: DataTypes.INTEGER},
    brand: {type: DataTypes.STRING(50)},
    model: {type: DataTypes.STRING(50)},
    createdAt: false,
    updatedAt: false,
})

const Service = sequelize.define('service', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    description: {type: DataTypes.TEXT},
    class: {type: DataTypes.INTEGER},
    createdAt: false,
    updatedAt: false,
})

const Bonuses = sequelize.define('bonuses', {
    //id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    sum: {type: DataTypes.INTEGER},
    discount: {type: DataTypes.INTEGER},
})

const OrderService = sequelize.define('orderservice', {
    //id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //автоинкрементация
})

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(UserCar)
UserCar.belongsTo(User)

UserCar.hasMany(Order)
Order.belongsTo(UserCar)

Car.hasMany(UserCar)
UserCar.belongsTo(Car)

Order.hasMany(OrderService)
OrderService.belongsTo(Order)

Service.hasMany(OrderService)
OrderService.belongsTo(Service)

module.exports = {
    User, Order, UserCar, Car, Service, Bonuses, OrderService
}