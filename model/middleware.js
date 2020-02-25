var  jwt = require('jsonwebtoken')
    ,config = require('../util/config')
    ,api    = require('../api/index')
    ;

var isLogged = function(req, res, next){
  // verifies secret and checks exp
  var token = req.body.token || req.query.token;
  // console.log('token:', token)
  jwt.verify(token, config.secret, function(err, decoded) {
    var response = {
      status: -1,
      message: 'No ha ingresado al aplicativo'
    }
    
    if (err) {
      res.send(response);
    } else {
      // if everything is good, save to request for use in other routes
      // console.log('decoded:', decoded);
      req.decoded = decoded;    
      next();
    }
  });
};


exports.isLogged       = isLogged;