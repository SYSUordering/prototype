var db=require('./db')

var insert_sql = 'INSERT INTO category (restaurant_id, name) VALUES (?, ?);'
var select_sql = 'SELECT * FROM category WHERE restaurant_id = ?'

module.exports = {
    create: function(restaurant_id, name) {
        return db.queryDb(insert_sql, [restaurant_id, name])
            .then(function(result) {
                return db.queryDb(select_sql, [restaurant_id])
            })
    },
    get: function(restaurant_id) {
        return db.queryDb(select_sql, [restaurant_id])
    }
}