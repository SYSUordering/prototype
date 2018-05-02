var db = require('../db')
// Create restaurant account.
var getRestaurant = function(req, res, next) {
    // Valid the form data.
    if (req.query.number === undefined) {
        res.status(500).send('Internal Server Error. Find no \'number\'.')
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
        // delete result[0]['manager_password']
        res.status(200).send(result[0])
    })
    req.getConnection(selector)

}
module.exports = getRestaurant