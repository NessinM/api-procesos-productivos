var request  = require('request')
    ,general = require('../util/general')
    ,sql     = require('mssql')
    ,config	 = require('../util/config')
    ;

var getConnection = function(empresa, callback) {
  var con = new sql.Connection(config[empresa].db.object_connection, function(err) {
    if (err) {
    	console.error('Error: ', err);
      console.error('Error: ', err.message);
      console.log('config[empresa].db.object_connection:', config[empresa].db.object_connection)
    	con.close();
    	callback(err);
    	return;
    }
    // Query 
 		callback(null, con);
 	});
};

exports.getConnection     = getConnection;
