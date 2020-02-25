var jwt     = require('jsonwebtoken')
  , config  = require('../util/config')
  , general = require('../util/general')
  , api     = require('../api/index')
  , _       = require('lodash')
  , mail    = require('../util/mail')
  , general = require('../util/general')
  ;

var login = function(req, res){

  var usuario  = req.body.username
  var password = req.body.password

  var response = {
    status: 0
  }

  if (!usuario || !password) {
    response.message = 'Alguno de los campos se encuentran vacios'
    res.send(response)
    return
  }
  
  api.usuario.getOne(usuario, function(err, found, data) {
    if (err) {
      console.error('Error: ', err.message)
      response.message = err.message
      res.send(response)
      return
    }

    if (found) {
      if (data.password !== password) {
        response.message = 'La contraseña es incorrecta'
        res.send(response)
        return
      }

      var objetoUsuario = {
        usuario: data.usuario,
        nombre : data.nombre
      }
  
      
      var token = jwt.sign(objetoUsuario, config.secret)
      
      response = {
        usuario: objetoUsuario.usuario,
        token  : token,
        nombre : objetoUsuario.nombre
      }

      response.status = 1
      res.send(response)

    } else {
      response.message = `El usuario ${usuario} no se encuentra registrado`
      res.send(response)
    }
  })
}

exports.login         	= login