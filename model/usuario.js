var jwt     = require('jsonwebtoken')
  , config  = require('../util/config')
  , general = require('../util/general')
  , api     = require('../api/index')
  , _       = require('lodash')
  , mail    = require('../util/mail')
  , general = require('../util/general')
  ;

var login = function (req, res) {
  var empresa  = req.body.empresa
  var usuario  = req.body.username
  var password = req.body.password


  var response = {
    status: 0,
  }

  if (!usuario) {
    response.message = 'Debe ingresar un usuario'
    res.send(response)
    return
  }

  api.ws.usuario.ingreso(empresa, usuario, password, function(err, data) {
    if (err) {
      console.error('err.message', err.message)
      response.message = err.message
      res.send(response)
      return
    }

    var objetoUsuario = {
      usuario: usuario,
      perfil : data.tipo,
      nombre : data.nombre,
    }

    response = {
      usuario: objetoUsuario.usuario,
      perfil : objetoUsuario.perfil,
      nombre : objetoUsuario.nombre
    }

    var token = jwt.sign(objetoUsuario, config.secret)
    response.status = 1
    response.token  = token
    res.send(response)
  })
}

exports.login                    = login;
