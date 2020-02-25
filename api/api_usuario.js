var util = require('./util.js')
    ,general = require('../util/general')
    ;

var ingreso = function(empresa, usuario, password, callback){
  
  general.infoLog(empresa, {metodo: 'ingreso', usuario: usuario})

  var method = 'ingreso',
      form = {
        username: usuario,
        password: password
      };

  var queryTime = `ws ${method} ${empresa}`
  general.timeLog('start', queryTime)
  util.consumeWebService(empresa, method, form, function(err, data){
    general.timeLog('end', queryTime)
    if (err) {
      console.log('err.message:', err.message)
      callback(new Error(err.message));
      return;
    }
    
    callback(null, data);
  });

};

exports.ingreso = ingreso