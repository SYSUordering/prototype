var db = require('./db')
var Category = require('./category')

var insert_sql = 'INSERT INTO restaurant (manager_number, manager_password, restaurant_name) VALUES (?, ?, ?)'
var select_valid_sql = 'SELECT restaurant_id, manager_number FROM restaurant WHERE manager_number=? AND manager_password=?'
var select_info_sql = 'SELECT restaurant_id, manager_number, restaurant_name, description, image_id, restaurant_number, desk_number '+
                    'FROM restaurant WHERE restaurant_id=?'

var update_desk_num_sql = 'UPDATE restaurant SET desk_number=? WHERE restaurant_id=?'

var select_order_info_sql = 'SELECT order_counter, order_timestamp FROM restaurant '+
                            'WHERE restaurant_id=? AND (NOW()-order_timestamp)>24*3600*1000'
var update_order_add_sql = 'UPDATE restaurant SET order_counter=order_counter+1, order_stamp=NOW() WHERE restaurant_id=? RETURNING'
var update_order_zero_sql = 'UPDATE restaurant SET order_counter=1, order_stamp=NOW() WHERE restaurant_id=? RETURNING'

module.exports = {
    create: function(number, password, name) {
        return db.queryDb(insert_sql, [number, password, name])
            .then(function(result) {
                return db.queryDb(select_info_sql, [result.insertId])
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
    },
    update_desk: function(desk_number, restaurant_id) {
        return db.queryDb(update_desk_num_sql, [desk_number, restaurant_id])
    },
    get_order: function(restaurant_id) {
        return db.queryDb(select_order_info_sql, [restaurant_id])
    },
    update_order_add: function(restaurant_id) {
        return db.queryDb(update_order_add_sql, [restaurant_id])
    },
    update_order_zero: function(restaurant_id) {
        return db.queryDb(update_order_zero_sql, [restaurant_id])
    }
}
