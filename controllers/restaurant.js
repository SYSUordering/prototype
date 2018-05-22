var db = require('../db')
var crypto = require('crypto')
// Create restaurant account.
var create = function(req, res, next) {
    // Valid the form data.
    if (req.body.number === undefined 
        || req.body.number === ''
        || req.body.password === undefined 
        || req.body.password === ''
        || req.body.restaurant_name === undefined
        || req.body.restaurant_name === '') {
        console.log('Error: wrong post format.')
        res.status(400).send('Error: wrong post format.')
        return
    }

    // Get md5(password)
    var md5 = crypto.createHash('md5')
    var password = md5.update(req.body.password).digest('hex')

    var sql = 'INSERT INTO restaurant (manager_number, manager_password, restaurant_name) VALUES (?, ?, ?)',
        value = [req.body.number, password, req.body.restaurant_name]

    // Database operation.
    var inserter = db.inserter(sql, value, function(err, result) {
        if (err) {
            console.log('Error: Duplicate number.')
            return res.status(403).send('Error: Duplicate number.')
        }
        res.status(201).send('OK')
    })
    req.getConnection(inserter)
}

// Get restaurant account.
var get = function(req, res, next) {
    // Valid the form data.
    if (req.query.number === undefined || req.query.number === '') {
        res.status(400).send('Error: wrong get format. Find no \'number\'.')
        return
    }

    var sql = 'SELECT manager_number, restaurant_name, description,\
     image_id, restaurant_number FROM restaurant WHERE manager_number=?',
        value = [req.query.number]
    
    // Select the restaurant by number
    var selector = db.selector(sql, value, function(err, result) {
        if (err) {
            if (result !== undefined) console.log(result)
            console.log(err)
            return res.status(500).send('Internal Server Error. Database error.')
        }
        else if (result[0] === undefined) {
            res.status(500).send('Internal Server Error. The restaurant is not exist.')
        }
        else {
            res.status(201).send(result[0])
        }
    })
    req.getConnection(selector)

}

module.exports = {
    create: create,
    get: get
}