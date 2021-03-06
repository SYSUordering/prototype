var db=require('./db')
var insert_sql_ = 'INSERT INTO sale (dish_id, order_id, restaurant_id) VALUES '
var getSum_by_restaurant_sql = 'SELECT sum(total_price) FROM meal_order WHERE restaurant_id=?'
var getSum_by_day_sql = 'SELECT sum(total_price)  FROM meal_order WHERE restaurant_id=? AND TO_DAYS(TIMESTAMP(date)) = TO_DAYS(NOW())'
var getSum_by_weekend_sql = 'SELECT sum(total_price)  FROM meal_order WHERE restaurant_id=? AND YEARWEEK(date_format(date,\'%Y-%m-%d\')) = YEARWEEK(now()) GROUP BY DATE_FORMAT( date,\'%Y-%m-%d\')'
var getSum_by_month_sql = 'SELECT sum(total_price) FROM meal_order WHERE restaurant_id=? AND YEAR(TIMESTAMP(date)) = YEAR(NOW()) GROUP BY DATE_FORMAT( date,\'%Y-%m-%d\')'
var getSum_by_year_sql = 'SELECT sum(total_price) FROM meal_order WHERE restaurant_id=? AND YEAR(date)=YEAR(NOW())'
var getSum_by_dayhour_sql = 'SELECT sum(total_price), DATE_FORMAT( date,\'%Y-%m-%d %H\')  AS date FROM meal_order WHERE restaurant_id=? AND TO_DAYS(TIMESTAMP(date)) = TO_DAYS(NOW()) GROUP BY DATE_FORMAT( date,\'%Y-%m-%d %H\')'
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
    },
    getSumByID:function(restaurant_id) {
        return db.queryDb(getSum_by_restaurant_sql,[restaurant_id])
    },
    getSumByDay:function(restaurant_id,date) {
        return db.queryDb(getSum_by_day_sql,[restaurant_id,date])
    },
    getSumByWeekend:function(restaurant_id,date) {
        return db.queryDb(getSum_by_weekend_sql,[restaurant_id,date])
    },
    getSumByMonth:function(restaurant_id,date) {
        return db.queryDb(getSum_by_month_sql,[restaurant_id,date])
    },
    getSumByYear:function(restaurant_id,date) {
        return db.queryDb(getSum_by_year_sql,[restaurant_id,date])
    },
    getSumByHour:function(restaurant_id,date) {
        return db.queryDb(getSum_by_dayhour_sql,[restaurant_id,date])
    }
}