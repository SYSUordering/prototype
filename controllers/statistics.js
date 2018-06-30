var Sale = require('../models/sale')

//根据饭店ID获得营业额，取得是饭店自成立以来总的营业额
var SumByID = function(req,res,next) {
    Sale.getSumByID(req.session.restaurant_id)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'success Getsum!',
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

//获取当日的营业额
var SumByDay = function(req,res,next) {
	   // 校验获取 日期format
    if (!req.query.date) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    Sale.getSumByDay(req.session.restaurant_id, req.query.date)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'success getSumByDate!',
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

//获取本周的营业额
var SumByWeekend = function(req,res,next) {
	   // 校验获取 日期format
    if (!req.query.date) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    Sale.getSumByWeekend(req.session.restaurant_id, req.body.date)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'success getSumByDate!',
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

//获取本月的营业额
var SumByMonth = function(req,res,next) {
	   // 校验获取 日期format
    if (!req.query.date) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    Sale.getSumByMonth(req.session.restaurant_id, req.body.date)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'success getSumByDate!',
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

//获取全年的营业额
var SumByYear = function(req,res,next) {
	   // 校验获取 日期format
    if (!req.query.date) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    Sale.getSumByYear(req.session.restaurant_id, req.body.date)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'success getSumByDate!',
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

// 按小时获取每天营业额
var SumByHour = function(req,res,next) {
	   // 校验获取 日期format
    if (!req.query.date) {
        console.log('[Error] wrong post format.')
        return res.status(400).json({
            errcode: 400,
            errmsg: '[Error] wrong post format.'
        })
    }
    Sale.getSumByHour(req.session.restaurant_id, req.body.date)
    .then(function(result) {
        return res.status(200).json({
            code: 200,
            msg: 'success getSumByDate!',
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
	SumByID:SumByID,
	SumByDay:SumByDay,
	SumByWeekend:SumByWeekend,
	SumByMonth:SumByMonth,
	SumByYear:SumByYear,
	SumByHour:SumByHour
}