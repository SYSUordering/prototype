var db=require('./db')

var insert_sql = 'INSERT INTO meal_order (restaurant_id, total_price, dish_number, tableware, desk_id, state) '+
                'VALUES (?, ?, ?, ?, ?, \'未完成\')'
var select_sql = 'SELECT * FROM meal_order WHERE order_id=?'
var select_date_sql = 'SELECT * FROM meal_order WHERE restaurant_id=? '+
                    'AND TIMESTAMPDIFF(MINUTE, TIMESTAMP(?), date)>=0 '+
                    'AND TIMESTAMPDIFF(MINUTE, TIMESTAMP(?), date)<24*60'
var update_sql_ = 'UPDATE meal_order SET state=\'已完成\' WHERE order_id IN $ AND restaurant_id=?'

module.exports = {
    create: function(restaurant_id, total_price, dish_number, tableware, desk_id) {
        return db.queryDb(insert_sql, [restaurant_id, total_price, dish_number, tableware, desk_id])
        .then(function(result) {
            return db.queryDb(select_sql, [result.insertId])
        })
    },
    get: function(restaurant_id, date) {
        return db.queryDb(select_date_sql, [restaurant_id, date, date])
    },
    update_orders: function(order_list, restaurant_id) {
        order_id_list = '('
        for (var index = 0; index < order_list.length; index++) {
            order_id_list += String(order_list[index])
            if (index !== order_list.length-1) {
                order_id_list += ', '
            }
        }
        order_id_list += ')'
        update_sql = update_sql_.replace("$", order_id_list);

        return db.queryDb(update_sql, [restaurant_id])
    }
}
