var express = require('express');
var router = express.Router();

var mw = require('../model/middleware')

var usuario = require('../model/usuario')

// define the home page route
router.get('/', function(req, res) {
  res.send('Router de usuario');
});

app.post('/login', usuario.login);
app.get('/menu', mw.isLogged, usuario.getMenu);


module.exports = router;