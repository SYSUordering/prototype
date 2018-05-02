var db = require('../db')
// Create restaurant account.
var createRestaurant = function(req, res, next) {
    // Valid the form data.
    if (req.body.number === undefined 
        || req.body.password === undefined 
        || req.body.restaurant_name == undefined) {
        res.status(500).send('Internal Server Error')
        return
    }

    var sql = 'INSERT INTO restaurant (manager_number, manager_password, restaurant_name) VALUES (?, ?, ?)',
        value = [req.body.number, req.body.password, req.body.restaurant_name]

    // Database operation.
    var inserter = db.inserter(sql, value, function(err, result) {
        if (err) {
            if (result !== undefined) console.log(result)
            console.log(err)
            return res.status(500).send('Internal Server Error')
        }
        res.status(201).send('OK')
    })
    req.getConnection(inserter)
}
module.exports = createRestaurant