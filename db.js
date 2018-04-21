// insert a record into restaurant table
exports.inserter = function(sql, value, callback) {
    return function(err, connection) {
        if (err) return callback(err, "[ERROR] connection error.")
        connection.query(sql, value, callback)
    }
}

// select a record from restaurant table
exports.selector = function(sql, value, callback) {
    return function(err, connection) {
        if (err) return callback(err, "[ERROR] connection error.")
        connection.query(sql, value, callback)
    }
}