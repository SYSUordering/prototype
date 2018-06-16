var db=require('./db')

var insert_sql = 'INSERT INTO dish (dish_name, image_url, price, flavor, description, category_id, restaurant_id) '+
                'VALUES (?, ?, ?, ?, ?, ?, ?)'
var select_sql = 'SELECT * FROM dish WHERE dish_id=?'
var select_by_res_sql = 'SELECT * FROM dish WHERE restaurant_id=?'
var update_sql = 'UPDATE dish SET dish_name=?, price=?, flavor=?, description=?, category_id=? '+
                'WHERE dish_id=? AND restaurant_id=?'

module.exports = {
    create: function(dish_name, image_url, price, flavor, description, category_id, restaurant_id) {
        return db.queryDb(insert_sql, [dish_name, image_url, price, flavor, description, category_id, restaurant_id])
        .then(function(result) {
            return db.queryDb(select_sql, result.insertId)
        })
    },
    get: function(restaurant_id) {
        return db.queryDb(select_by_res_sql, restaurant_id)
    },
    update: function(dish_id, restaurant_id, dish_name, price, flavor, description, category_id) {
        return db.queryDb(update_sql, [ dish_name, price, flavor, description, category_id, dish_id, restaurant_id])
    }
}