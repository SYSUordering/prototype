var db=require('./db')

var insert_sql = 'INSERT INTO category (restaurant_id, category_name) VALUES (?, ?);'
var select_sql = 'SELECT * FROM category WHERE restaurant_id = ?'
var update_sql = 'UPDATE category SET category_name=? WHERE category_id=? AND restaurant_id=?'
module.exports = {
    create: function(restaurant_id, category_name) {
        return db.queryDb(insert_sql, [restaurant_id, category_name])
            .then(function(result) {
                return db.queryDb(select_sql, [restaurant_id])
            })
    },
    get: function(restaurant_id) {
        return db.queryDb(select_sql, [restaurant_id])
    },
    update: function(category_name, category_id, restaurant_id) {
        return db.queryDb(update_sql, [category_name, category_id, restaurant_id])
    }
}