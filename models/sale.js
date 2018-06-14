var db=require('./db')
var insert_sql = 'INSERT INTO sale (dish_id, order_id, restaurant_id) VALUES '
module.exports = {
    create: function(dish_list, order_id, restaurant_id) {
        var insert_sql_ = insert_sql
        data = []
        for (var index = 0; index < dish_list.length; index++) {
            data.push(dish_list[index].dish_id)
            data.push(order_id)
            data.push(restaurant_id)
            insert_sql_ += '(?, ?, ?)'
            if (index !== dish_list.length-1) {
                insert_sql_ += ', '
            }
        }
        return db.queryDb(insert_sql_, data)
    }
}