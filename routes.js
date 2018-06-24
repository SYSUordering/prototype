var express = require('express')
var router = express.Router()
var multer  = require('multer')
var crypto = require('crypto')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/img')
    },
    filename: function (req, file, cb) {
        if (req.session.restaurant_id) {
            var md5 = crypto.createHash('md5')

            file.originalname = file.originalname.replace(' ', '-')
            var names = file.originalname.split('.')
            
            var restaurant_id = req.session.restaurant_id.toString()
            var date = Date.now()
            var type = names.pop()
            var file_name = names.join('.')
            name = file_name + '_' + restaurant_id + '_' + date
            
            name = md5.update(name).digest('hex')

            cb(null, name + '.' + type)
        }
    }
})
  
var upload = multer({ storage: storage })

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
router.route('/restaurant').put(upload.single('avatar'), restaurantController.updateRestaurant)

// menu API
router.get('/menu', menuController.getMenu)
router.post('/menu/category', menuController.createCategory)
router.route('/menu/dish').post(upload.single('avatar'), menuController.createDish)
router.put('/menu/category', menuController.updateCategory)
router.route('/menu/dish').put(upload.single('avatar'), menuController.updateDish)

// order API
router.post('/order', orderController.createOrder)
router.get('/order', orderController.getOrders)
router.put('/order', orderController.finishOrders)

module.exports = router
