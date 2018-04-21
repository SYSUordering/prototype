var db = require('../db')
// Create restaurant account.
var verifyNumber = function(req, res, next) {
    // Valid the form data.
    if (req.body.number === undefined) {
        res.status(500).send('Something broke!')
        return
    }

    var sql = 'SELECT * FROM restaurant WHERE manager_number=?',
        value = [req.query.number]
    
    var selector = db.selector()

}
module.exports = createRestaurant