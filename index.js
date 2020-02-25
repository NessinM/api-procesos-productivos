var express                          = require('express'),
    app                              = express(),
    config                           = require('./util/config'),
    general                          = require('./util/general'),
    morgan                           = require('morgan'),
    path                             = require('path')
    cors                             = require('cors'),
    multer                           = require('multer'),
    cron                             = require('node-cron'),
    bodyParser                       = require('body-parser');
    
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

app.listen(config.port, function(){
	console.log('Escuchando en puerto ' + config.port + ' environment ' + config.env)
});

process.on('uncaughtException', function(err) {
	if(config.dev) console.error(err.stack);
	else {
		general.notifySlack('no se sabe', err, 'no handled error', 'no handled error', function(err){
		  process.exit(1);
		});
	}
})
