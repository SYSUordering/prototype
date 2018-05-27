var db = require('../db')

var get = function(req,res,next) {
	if(req.session.manager_number) {
		val sql = 'SELECT creation_date, dish_name, price, image_id, flavor,favorable_table,description FROM category WHERE category_id=? AND comment_number=?'
		value = res.query.number

   	    var selector = db.selector (sql, value, function(err, result) {
   	    	if(err) {
   	    		if(result !== undefined) console.log(result)
   	    		console.log(err)
   	    		return res.status(500).send('Internal Server Error. Database error.')
   	    	} else if (result[0] === undefined) {
   	    		res.status(500).send('Internal Server Error. The dish is not exist.')
   	    	} else {
   	    		res.status(200).send(result[0]);
   	    	}
   	    })
   	     req.getConnection(selector)
	} else {
		return res.status(400).send('[Error] No login')
	}
}