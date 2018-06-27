var crypto = require('crypto')
var Restaurant = require('../models/restaurant')
// Create session, when login
var createSession = function(req, res, next) {
    // Valid the form data.
    if (!req.body.manager_number || !req.body.password) {
        return res.status(400).json({
            errcode:400,
            errmsg: '[Error] Wrong post formal.'
        })
    }

    // Get md5(password)
    var md5 = crypto.createHash('md5')
    var password = md5.update(req.body.password).digest('hex')


    Restaurant.valid(req.body.manager_number, password)
    .then(function(result) {
        if (result[0] === undefined) {
            return res.status(403).json({
                errcode: 403,
                errmsg: '[Error] Number or Password error.'
            })
        }
        else {
            // password right
            req.session.regenerate(function(err) {
                if (err) {
                    return res.status(500).json({
                        errcode: 500,
                        errmsg: '[Error] Internal Server Error. Redis error.',
                        errdata: err
                    })
                }
                req.session.restaurant_id = result[0].restaurant_id
                req.session.manager_number = result[0].manager_number
                return res.status(201).json({
                    code: 201,
                    msg: 'Session Created.'
                })
            })
        }
    })
    .catch(function(err) {
        console.log(err)
        return res.status(500).json({
            errcode: 500, 
            errmsg: '[Error] Internal server error.',
            errdata: err
        })
    })
}

var updateSession = function (req, res, next) {
    if (req.session.manager_number) {
        // 已经是登录状态，更新session
        req.session.reload(function(err) {
            if (err) {
                console.log('[Error]', err)
                return res.status(500).json({
                    errcode: 500,
                    errmsg: '[Error] Internal Server Error. Redis error.',
                    errdata: err
                })
            }
            return res.status(200).json({
                code: 200,
                msg: 'Session reload.'
            })
        })
    }
    else {
        // 为登录
        return res.status(403).json({
            errcode: 403,
            errmsg: '[Error] No login'
        })
    }
}

var deleteSession = function (req, res, next) {
    if (req.session.manager_number) {
        // 已经是登录状态，更新session
        req.session.destroy(function(err) {
            if (err) {
                console.log('[Error]', err)
                return res.status(500).json({
                    errcode: 500,
                    errmsg: 'Internal Server Error. Redis error.',
                    errdata: err
                })
            }
            return res.status(200).json({
                code: 200,
                msg: 'Session destroy.'
            })
        })
    }
}

var checkSession = function (req, res, next) {
    if (req.path === '/session' || req.path==='/restaurant' || req.session.manager_number
        || (req.path === '/order' && req.method === 'POST') || (req.path === '/menu' && req.method === 'GET') ) {
      next();
    }
    else return res.status(401).json({
      errcode: 401,
      errmsg: '[Error] You have not sign in'
    })
}

module.exports = {
    createSession: createSession,
    updateSession: updateSession,
    deleteSession: deleteSession,
    checkSession: checkSession
}
