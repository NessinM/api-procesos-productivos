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

var getMenu =  function(req, res) {
  var empresa = req.query.empresa
  var perfil = req.decoded.perfil
  var usuario = req.decoded ? req.decoded.usuario : 'undefined' 

  var response = {
    status : 0
  }

  general.infoLog(empresa, {metodo: 'getMenu', usuario: usuario})

  console.log('perfil:', perfil)

  var obj = []

  obj = addMenuItem(obj, 'Documentos')
  obj = addMenuItem(obj, 'HojasDeRutaComercial')
  obj = addMenuItem(obj, 'aprobarHojasRutaServicioTecnico')
 
  response.status = 1
  response.menu  = obj
  res.send(response)
}

var addMenuItem = function (menu, item) {
  var aux  = {}
  if (item === 'HojasDeRutaComercial') {
    aux = {
      key : 'hojas-ruta-comercial',
      name: 'Hojas de Ruta Comercial',
      path: '/hojas-de-ruta-comercial',
      icon: 'fa-file'
    }
  }
  if (item === 'Documentos') {
    aux = {
      key : 'aprobar-documentos-comercial',
      name: 'Aprobar Documentos Comercial',
      path: '/aprobar-documentos-comercial/',
      icon: 'fa-check'
    }
  }
  if (item === 'aprobarHojasRutaServicioTecnico') {
    aux = {
      key : 'aprobar-documentos-servicio-tecnico',
      name: 'Aprobar Documentos Servicio Tecnico',
      path: '/aprobar-documentos-servicio-tecnico',
      icon: 'fa-check'
    }
  }

  if (aux.key) menu.push(aux)
  return menu
}

exports.login                    = login;
exports.getMenu                  = getMenu;
