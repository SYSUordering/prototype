var Order = require('../models/order')
var Sale = require('../models/sale')
var Restaurant = require('../models/restaurant')
var createOrder = function(req, res, next) {
    req.body.total_price = Number(req.body.total_price)
    req.body.desk_id = Number(req.body.desk_id)
    req.body.restaurant_id = Number(req.body.restaurant_id)
    // 校验表单format
    if (!req.body.restaurant_id
        || !req.body.total_price
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
    Order.create(req.body.restaurant_id, req.body.total_price, Number(req.body.dish_list.length),  req.body.tableware, req.body.desk_id)
    .then(function(result) {
        // 载入sale信息
        var newOrder=result[0]
        return Sale.create(req.body.dish_list, newOrder.order_id, req.body.restaurant_id)
        .then(function(result) {
            newOrder.dish_list = req.body.dish_list
            return newOrder
        })
    })
    .then(function(newOrder) {
        // 获取取餐号 order_number
        return Restaurant.get_order(req.body.restaurant_id)
        .then(function(result) {
            if (result[0]) {
                // 当天订单号，订单号+1
                return Restaurant.update_order_add(req.body.restaurant_id)
                .then(function(result) {
                    newOrder.order_number = result[1][0]['@ud']
                    return newOrder
                })
            }
            else {
                // 非当天订单号，订单号清0
                return Restaurant.update_order_zero(req.body.restaurant_id)
                .then(function(result) {
                    newOrder.order_number = 1
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

// 获取订单
var getOrders = function(req, res, next) {
    // query options: date
    if (!req.query.date) {
        console.log('[Error] wrong query format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong query format.'
        })
    }
    Order.get(req.session.restaurant_id, req.query.date)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: '[Success] Get order successfully.',
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
        || !req.body.order_list.length) {
        console.log('[Error] wrong put format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong put format.'
        })
    }

    Order.update_orders(req.body.order_list, req.session.restaurant_id)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: '[Success] Orders finish.',
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


module.exports = {
    createOrder: createOrder,
    getOrders: getOrders,
    finishOrders: finishOrders
}
