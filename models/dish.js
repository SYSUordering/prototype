var db=require('./db')

var insert_sql = 'INSERT INTO dish (dish_name, price, flavor, description, restaurant_id, category_id) '+
                'VALUES (?, ?, ?, ?, ?, ?)'
var select_sql = 'SELECT * FROM dish WHERE dish_id=?'
var select_by_res_sql = 'SELECT * FROM dish WHERE restaurant_id=?'

module.exports = {
    create: function(dish_name, price, flavor, description, restaurant_id, category_id) {
        return db.queryDb(insert_sql, [dish_name, price, flavor, description, restaurant_id, category_id])
        .then(function(result) {
            return db.queryDb(select_sql, result.insertId)
        })
    },
    get: function(restaurant_id) {
        return db.queryDb(select_by_res_sql, restaurant_id)
    }
}