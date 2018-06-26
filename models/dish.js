var db=require('./db')

var insert_sql = 'INSERT INTO dish (dish_name, image_url, price, flavor, description, category_id, restaurant_id) '+
                'VALUES (?, ?, ?, ?, ?, ?, ?)'
var select_sql = 'SELECT * FROM dish WHERE dish_id=?'
var select_by_res_sql = 'SELECT * FROM dish WHERE restaurant_id=?'
var update_image_sql = 'UPDATE dish SET dish_name=?, price=?, flavor=?, description=?, category_id=?, image_url=? '+
                'WHERE dish_id=? AND restaurant_id=?'
var update_noimage_sql = 'UPDATE dish SET dish_name=?, price?, flavor=?, description=?, category_id=?'+
		'WHERE dish_id=? AND restaurant_id=?'
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
    }
}
