var express = require('express')
var router = express.Router()


// TODO: make route
// controllers
var sessionController = require('./controllers/session');
var restaurantController = require('./controllers/restaurant');
var menuController = require('./controllers/menu');


// session API
router.post('/session', sessionController.createSession)
router.get('/session', sessionController.updateSession)
router.delete('/session', sessionController.deleteSession)

// restaurant API
router.get('/restaurant', restaurantController.getRestaurant)
router.post('/restaurant', restaurantController.registerRestaurant)

// menu API
router.get('/menu', menuController.getMenu)
router.post('/menu/category', menuController.createCategory)
router.post('/menu/dish', menuController.createDish)

module.exports=router