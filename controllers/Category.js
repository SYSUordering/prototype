var db = require('../db')

// 返回category的number
var get = function(req, res, next) {
   if(req.session.manager_number) {
   	    val sql = 'SELECT category_id, name FROM restaurant WHERE manager_number=?',
   	    value = res.query.number

   	    var selector = db.selector (sql, value, function(err, result) {
   	    	if(err) {
   	    		if(result !== undefined) console.log(result)
   	    		console.log(err)
   	    		return res.status(500).send('Internal Server Error. Database error.')
   	    	} else if (result[0] === undefined) {
   	    		res.status(500).send('Internal Server Error. The restaurant is not exist.')
   	    	} else {
   	    		res.status(200).send(result[0]);
   	    	}
   	    })
   	     req.getConnection(selector)
   } else {
   		// 未登录
        return res.status(400).send('[Error] No login')
   }
}


module.exports = {
	get: get;
}