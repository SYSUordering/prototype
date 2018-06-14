var db=require('./db')

var insert_sql = 'INSERT INTO order (restaurant_id, total_price, dish_number, tableware, desk_id, state) '+
                'VALUES (?, ?, ?, ?, ?, \'未完成\')'
var select_sql = 'SELECT * FROM order WHERE order_id=?'
var select_unfinished_sql = 'SELECT * FROM order WHERE restaurant_id=? AND state=\'未完成\''
var update_sql = 'UPDATE order SET state=\'已完成\' WHERE order_id IN ? AND restaurant_id=?'

module.exports = {
    create: function(restaurant_id, total_price, dish_number, tableware, desk_id) {
        return db.queryDb(insert_sql, [restaurant_id, total_price, dish_number, tableware, desk_id])
        .then(function(result) {
            return db.queryDb(select_sql, [result.insertId])
        })
    },
    get_unfinished: function(restaurant_id) {
        return db.queryDb(select_unfinished_sql, [restaurant_id])
    },
    update_orders: function(order_list, restaurant_id) {
        order_id_list = '('
        for (var index = 0; index < order_list.length; index++) {
            order_id_list += order_list[index].order_id.toString()
            if (index !== order_list.length-1) {
                order_id_list += ', '
            }
        }
        order_id_list += ')'
        
        return db.queryDb(update_sql, [order_id_list, restaurant_id])
    }
}