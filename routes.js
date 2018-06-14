var express = require('express')
var router = express.Router()


// TODO: make route
// controllers
var sessionController = require('./controllers/session');
var restaurantController = require('./controllers/restaurant');
var menuController = require('./controllers/menu');
var orderController = require('./controllers/order');

// session API
router.post('/session', sessionController.createSession)
router.get('/session', sessionController.updateSession)
router.delete('/session', sessionController.deleteSession)

// restaurant API
router.get('/restaurant', restaurantController.getRestaurant)
router.post('/restaurant', restaurantController.registerRestaurant)
router.put('/restaurant/desk', restaurantController.updateDesk)

// menu API
router.get('/menu', menuController.getMenu)
router.post('/menu/category', menuController.createCategory)
router.post('/menu/dish', menuController.createDish)

// order API
router.post('/order', orderController.createOrder)
router.get('/order', orderController.getUnfinishedOrders)
router.put('/order', orderController.finishOrders)

module.exports=router