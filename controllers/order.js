var Order = require('../models/order')
var Sale = require('../models/sale')
var Restaurant = require('../models/restaurant')
var createOrder = function(req, res, next) {
    // 校验表单format
    if (!req.body.restaurant_id
        || !req.body.total_price
        || !req.body.dish_number
        || !req.body.desk_id
        || !req.body.tableware
        || !req.body.dish_list
        || !req.body.dish_list.length) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    // 载入数据库，返回订单信息，返回订单号
    Order.create(req.body.restaurant_id, req.body.total_price, req.dis)
    .then(function(result) {
        // 载入sale信息
        var newOrder=result[0]
        return Sale.create(req.body.dish_list)
        .then(function(result) {
            newOrder.dish_list = dish_list
            return newOrder
        })
    })
    .then(function(newOrder) {
        // 获取取餐号 order_number
        return Restaurant.get_order(req.body.restaurant_id)
        .then(function(result) {
            if (result[0]) {
                // 当天订单号，订单号+1
                return Restaurant.update_order_add(restaurant_id)
                .then(function(result) {
                    newOrder.order_number = result[0].order_counter
                    return newOrder
                })
            }
            else {
                // 非当天订单号，订单号清0
                return Restaurant.update_order_zero(restaurant_id)
                .then(function(result) {
                    newOrder.order_number = result[0].order_counter
                    return newOrder
                })
            }
        })
    })
    .then(function(newOrder) {
        return res.status(201).json({
            code: 201,
            msg: '[Success] Create order successfully',
            data: newOrder
        })
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })
}

// 获取未完成订单
var getUnfinishedOrders = function(req, res, next) {
    Order.get_unfinished(req.session.restaurant_id)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: '[Success] Get unfinished order successfully.',
            data: result
        })
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })
}

// 更新订单状态
var finishOrders =  function(req, res, next) {
     // 校验表单format
     if (!req.body.order_list
        || req.body.order_list.length) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }

    Order.update_orders(req.body.order_list, req.session.restaurant_id)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: '[Success] Orders finish.'
        })
    })
    .catch(function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                errcode: 500,
                errmsg: '[Error] Internal Server Error. Database error.',
                errdata: err
            })
        }
    })

}


module.exports = {
    createOrder: createOrder,
    getUnfinishedOrders: getUnfinishedOrders,
    finishOrders: finishOrders
}