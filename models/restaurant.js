var db = require('./db')
var Category = require('./category')

var insert_sql = 'INSERT INTO restaurant (manager_number, manager_password, restaurant_name) VALUES (?, ?, ?)'
var select_valid_sql = 'SELECT restaurant_id, manager_number FROM restaurant WHERE manager_number=? AND manager_password=?'
var select_info_sql = 'SELECT restaurant_id, manager_number, restaurant_name, description, image_id, restaurant_number, desk_number'+
                    'FROM restaurant WHERE restaurant_id=?'

module.exports = {
    create: function(number, password, name) {
        return db.queryDb(insert_sql, [number, password, name])
            .then(function(result) {
                return db.queryDb(select_info_sql, [number])
            })
    },
    valid: function(number, password) {
        return db.queryDb(select_valid_sql, [number, password])
    },
    get: function(restaurant_id) {
        return db.queryDb(select_info_sql, [restaurant_id])
            .then(function(result) {
                if (result[0] == undefined)
                    return result[0]

                var restaurant = result[0]
                // 获取分类信息
                return Category.get(restaurant.restaurant_id)
                .then(function(categories) {
                    restaurant.categories = categories
                    return restaurant
                })
            })
    }
}