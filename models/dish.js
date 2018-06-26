var db=require('./db')

var insert_sql = 'INSERT INTO dish (dish_name, image_url, price, flavor, description, category_id, restaurant_id) '+
                'VALUES (?, ?, ?, ?, ?, ?, ?)'
var select_sql = 'SELECT * FROM dish WHERE dish_id=?'
var select_by_res_sql = 'SELECT * FROM dish WHERE restaurant_id=?'
var update_image_sql = 'UPDATE dish SET dish_name=?, price=?, flavor=?, description=?, category_id=?, image_url=? '+
                'WHERE dish_id=? AND restaurant_id=?'
var update_noimage_sql = 'UPDATE dish SET dish_name=?, price=?, flavor=?, description=?, category_id=? '+
        'WHERE dish_id=? AND restaurant_id=?'
var update_sale_sql_ = 'UPDATE dish SET sale_out=? WHERE restaurant_id=? AND dish_id IN '
var delete_sql = 'DELETE FROM dish WHERE dish_id=? AND restaurant_id=?'
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
    update: function(dish_id, restaurant_id, dish_name, price, flavor, description, category_id, image_url) {
        if (image_url)
            return db.queryDb(update_image_sql, [ dish_name, price, flavor, description, category_id, image_url, dish_id, restaurant_id])
        else
            return db.queryDb(update_noimage_sql, [ dish_name, price, flavor, description, category_id, dish_id, restaurant_id])
    },
    delete: function(dish_id, restaurant_id) {
        return db.queryDb(delete_sql, [dish_id, restaurant_id])
    },
    update_sale_out: function(sale_out, dish_id_list, restaurant_id) {
        var dish_str = '('
        for (var index = 0; index < dish_id_list.length; index++) {
            dish_str += toString(dish_id_list[index])
            if (index != dish_id_list.length-1) {
                dish_str += ','
            }
        }
        dish_str += ')'

        var update_sale_sql = update_sale_sql_ + dish_str
        return db.queryDb(update_sale_sql, [sale_out, restaurant_id])
    }
}
