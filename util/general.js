var moment = require('moment')
	,request  = require('request')
	,config  = require('./config')
	;

var notifySlack = function (empresa, err, adicional, adicional2, callback) {
	// Envio el error
	var programa = 'Siv Web'
	var obj = {
			"attachments": [
				{
					"fallback": err.message,
					"color": "danger",
					"pretext": "Empresa: " + empresa,
					"author_name": "Metodo: " + adicional,
					"title": adicional2,
					"text": err.stack,
					"fields": [
			        {
			            "title": "Hora",
			            "value": moment().format("DD/MM/YYYY, h:mm:ss a"),
			            "short": true
			        }
			    ]
				}
			]
	};

	// #datacont-movil
	// var url = 'https://hooks.slack.com/services/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';
	// obj.username = programa;
	
	// request.post(url, {form: JSON.stringify(obj)}, function(err, response, body) {
	// 	if (err) {
	// 		console.error('Error al enviar el request a slack:', err.message);
	// 	}
	// 	console.log('Resultado del envío a Slack:', body);
	//   if(callback) callback();
	// });
};

var infoLog = function(empresa, obj, tipo) {
	var tipoLocal = tipo ? tipo : 'request'

	var texto = tipoLocal + ' '
	texto += empresa + ' '

	var keys = Object.keys(obj) 

	//Agregamos los inputs
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    
    texto += key + ' '
    texto += obj[key] + ' '
  }

  console.log(texto)
}

var timeLog = function (type, text) {
	if (type === 'start') {
		console.time(text)
	} else if (type === 'end') {
		console.timeEnd(text)
	}
}

var notifyProcessToSlack = function (empresa, err, parameters, callback) {
	// parameters = {
		// nombreProceso: 'Actualizar vendedores'
	// }
	var programa = 'Funns'
	var obj = {
			"attachments": [
				{
					"fallback": err ? err.message : 'Éxito',
					"color": err ? "danger" : 'good',
					"pretext": "Empresa: " + empresa,
					"author_name": programa,
					"title": "Proceso: " + parameters.nombreProceso,
					"text": err ? err.stack : 'Proceso ejecutado con éxito',
					"fields": [
			        {
			            "title": "Hora",
			            "value": moment().format("DD/MM/YYYY, h:mm:ss a"),
			            "short": true
			        }
			    ]
				}
			]
	};

	// #datacont-movil
	var url = 'https://hooks.slack.com/services/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';
	obj.username = programa;
	
	request.post(url, {form: JSON.stringify(obj)}, function(err, response, body) {
		if (err) {
			console.error('Error al enviar el request a slack:', err.message);
		}
		console.log('Resultado del envío a Slack:', body);
	  if(callback) callback();
	});
}

var notifyFirebase = function (empresa, tokenDevice, notification, callback) {

	var options = {
		url: 'https://fcm.googleapis.com/fcm/send',
		headers: {
			contentType  : 'application/json',
			authorization: 'key=AAAAoNs18Po:APA91bGG6ZtR_32K2OezLhU8kTNz8nUHlDHIGqKd9QiSDRVYVskK4JjF0-cfMPa77jORyrBop_fgEEVud7svL_wVyU61hll9U2zmXoJ5P6Rm9Opdcoxpxy8hjGBJUNfjsXzvdLpkvN5I'
		},
		form : {
			from        : '690872512762',
			data: {
				mensaje     : notification.body,
				titulo      : notification.title,
				icon        : '',
				click_action: 'https://funns.datacont.com'
			},
			to: tokenDevice
		}
	};
	
	request.post(options, function(err, response, body) {
		if (err) console.error('Error al enviar el request a firebase:', err)
		console.log('Resultado del envío a firebase:', body)
		if(callback) callback()
	})
}

exports.notifySlack          = notifySlack;
exports.infoLog              = infoLog;
exports.timeLog              = timeLog;
exports.notifyProcessToSlack = notifyProcessToSlack
exports.notifyFirebase       = notifyFirebase
