var db = require('./db')
var Category = require('./category')

var insert_sql = 'INSERT INTO restaurant (manager_number, manager_password, restaurant_name) VALUES (?, ?, ?)'
var select_valid_sql = 'SELECT restaurant_id, manager_number FROM restaurant WHERE manager_number=? AND manager_password=?'
var select_info_sql = 'SELECT restaurant_id, manager_number, restaurant_name, '+
                    'description, image_url, restaurant_number, desk_number, date '+
                    'FROM restaurant WHERE restaurant_id=?'
var update_sql = 'UPDATE restaurant SET restaurant_name=?, description=?, restaurant_number=? WHERE restaurant_id=?'

var update_desk_num_sql = 'UPDATE restaurant SET desk_number=? WHERE restaurant_id=?'

var select_order_info_sql = 'SELECT order_counter, order_timestamp FROM restaurant '+
                            'WHERE restaurant_id=? AND TIMESTAMPDIFF(MINUTE, CURDATE(), order_timestamp)>0'
var update_order_add_sql = 'UPDATE restaurant SET order_counter=(@ud:=order_counter+1), order_timestamp=NOW() WHERE restaurant_id=?; SELECT @ud;'
var update_order_zero_sql = 'UPDATE restaurant SET order_counter=1, order_timestamp=NOW() WHERE restaurant_id=?'

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
    },
    update: function(restaurant_name, description, restaurant_number, restaurant_id) {
        return db.queryDb(update_sql, [restaurant_name, description, restaurant_number, restaurant_id])
    },
    update_desk: function(desk_number, restaurant_id) {
        return db.queryDb(update_desk_num_sql, [desk_number, restaurant_id])
    },
    get_order: function(restaurant_id) {
        // TODO
        return db.queryDb(select_order_info_sql, [restaurant_id])
    },
    update_order_add: function(restaurant_id) {
        return db.queryDb(update_order_add_sql, [restaurant_id])
    },
    update_order_zero: function(restaurant_id) {
        return db.queryDb(update_order_zero_sql, [restaurant_id])
    }
}
