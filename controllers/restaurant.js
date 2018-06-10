var crypto = require('crypto')
var Restaurant = require('../models/restaurant')
// Register restaurant account.
var registerRestaurant = function(req, res, next) {
    // Valid the form data.
    if (req.body.number === undefined 
        || req.body.number === ''
        || req.body.password === undefined 
        || req.body.password === ''
        || req.body.restaurant_name === undefined
        || req.body.restaurant_name === '') {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }

    // Get md5(password)
    var md5 = crypto.createHash('md5')
    var password = md5.update(req.body.password).digest('hex')

    Restaurant.create(req.body.number, password, req.body.restaurant_name)
    .then(function(result) {
        let restaurant = result[0]
        restaurant.categories = null
        return res.status(201).json({
            code: 201,
            msg: '[Success] Created',
            data: restaurant
        })
    })
    .catch(function(err) {
        if (err) {
            console.log('Error: Duplicate number.')
            // console.log(err)
            return res.status(403).json({
                errcode: 403,
                errmsg: '[Error] Duplicate number.'
            })
        }
    })
}

// Get restaurant account.
var getRestaurant = function(req, res, next) {
    // Valid the form data.
    var restaurant_id
    if (req.session.restaurant_id === undefined) {
        if (req.query.restaurant_id === undefined || req.query.restaurant_id === '') {
            return res.status(400).json({
                errcode: 400, 
                errmsg: '[Error] wrong get format. Find no \'restaurant_id\'.'
            })
        }
        else restaurant_id = req.query.restaurant_id
    }
    else restaurant_id = req.session.restaurant_id


    Restaurant.get(restaurant_id)
    .then(function(result) {
        if (result === undefined) {
            return res.status(403).json({
                errcode: 403,
                errmsg: '[Error] The restaurant is not exist.'
            })
        }
        else {
            console.log(result)
            var restaurant = result
            return res.status(201).json({
                code: 200,
                msg: '[Success] Get restaurant successfully',
                data: restaurant
            })
        }
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })

}

module.exports = {
    registerRestaurant: registerRestaurant,
    getRestaurant: getRestaurant
}