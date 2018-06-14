var db=require('./db')
var insert_sql_ = 'INSERT INTO sale (dish_id, order_id, restaurant_id) VALUES '
module.exports = {
    create: function(dish_list, order_id, restaurant_id) {
        var insert_sql = insert_sql_
        data = []
        for (var index = 0; index < dish_list.length; index++) {
            data.push(dish_list[index].dish_id)
            data.push(order_id)
            data.push(restaurant_id)
            insert_sql += '(?, ?, ?)'
            if (index !== dish_list.length-1) {
                insert_sql += ', '
            }
        }
        return db.queryDb(insert_sql, data)
    }
}