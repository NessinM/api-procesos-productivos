var express    = require('express'),
    app        = express(),
    config     = require('./util/config'),
    general    = require('./util/general'),
    morgan     = require('morgan'),
    path       = require('path')
    cors       = require('cors'),
    multer     = require('multer'),
    cron       = require('node-cron'),
    bodyParser = require('body-parser');
    server     = require('http').Server(app);
    io         = require('socket.io')(server);
    
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(cors());

// Statics
app.use('/statics', express.static('statics'))

//Para muestra, todos los request a /articulo van al router
app.use('/usuario', require('./router/usuario'))

server.listen(config.port, () => {
	console.log('Servidor corriendo en el puerto ' + config.port + ' ubicado en el entorno de ' + config.env)
})

io.on('connection', socket => {
	console.log('Nuevo usuario conectado')

	socket.on('disconnect', () => {
			console.log('Usuario fue desconectado')
	})
})

