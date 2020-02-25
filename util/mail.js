var email = require('emailjs')
  ,pug = require('pug')
  ,config = require('./config')
  ,path = require('path')
  , fs      = require('fs')
  ;

var send = function(empresa, obj, callback) {
  var emailData = {
    user     : "efacturas@datacont.com", 
    password : "suiplo-98", 
    host     : "webmail.datacont.com", 
    tls      : true
  };
  var nombreFull     = config[empresa].nombreFull
      obj.logo       = config[empresa].logo
      obj.data.logo  = config[empresa].logo
      obj.data.color = config[empresa].color
  
  var server  = email.server.connect(emailData);
  var plantillaMail = path.join(process.cwd(), 'template_mail', obj.template + '.pug');
  var options = {
    obj: obj.data
  };

  var body = pug.renderFile(plantillaMail, options);

  if (config.dev) {
    console.log('Deberia enviarse a', obj.to, 'y ', obj.bcc,' pero es dev')
    obj.to  = 'mtorres@datacont.com'
    obj.bcc = ''
  } else {
    obj.bcc = 'fbenavides@datacont.com'
  }
  
  var mensaje =   {
    text      : obj.prefix + " " + obj.subject,
    from      : "Siaf " + nombreFull + "<" + "efacturas@datacont.com" + ">",
    to        : obj.to,
    bcc       : obj.bcc,
    subject   : obj.prefix + " " + obj.subject + " " + nombreFull,
    attachment: 
    [
      {
        data:body, 
        alternative:true
      }
    ]
  };
  
  server.send(mensaje, function(err, message) {
    if (err) console.error('Error al enviar mail: ', err.message);
    if (callback) callback(err) 
  });
}

var sendAlone = function(empresa, obj, callback) {
  var emailData = {
    user     : "efacturas@datacont.com", 
    password : "suiplo-98", 
    host     : "webmail.datacont.com", 
    tls      : true
  };

  //Rellenamos datos repetitivos
  var nombreFull = config[empresa].nombreFull
  obj.data.logo = config[empresa].logo
  
  // console.log('obj:', obj)
  var server  = email.server.connect(emailData);
  if (obj.template) {
    var plantillaMail = path.join(process.cwd(), 'template_mail', obj.template + '.pug');
  }
  var options = {
    obj: obj.data
  };
  var body = pug.renderFile(plantillaMail, options);
  
  if (config.dev) {
    console.log('Deberia enviarse a', obj.to, 'y ', obj.bcc,' pero es dev')
    obj.to  = 'fbenavides@datacont.com'
    obj.bcc = ''
  } else {
    obj.bcc = 'fbenavides@datacont.com'
  }
  
  
  var mensaje =   {
    text       : obj.prefix + " " + obj.subject, 
    from       : "Notificaciones Self Service " + nombreFull + "<" + "efacturas@datacont.com" + ">", 
    to         : obj.to,
    bcc        : obj.bcc,
    subject    : obj.prefix + " " + obj.subject + " " + nombreFull,
    attachment : 
    [
      {
        data:body, 
        alternative:true
      }
    ]
  };
  
  server.send(mensaje, function(err, message) {
    if (err) console.error('Error al enviar mail: ', err.message);
    if (callback) callback(err) 
  });
}

var sendAttachment = function(empresa, obj, callback) {
  var emailData = {
    user     : "efacturas@datacont.com", 
    password : "suiplo-98", 
    host     : "webmail.datacont.com", 
    tls      : true
  };
  //Rellenamos datos repetitivos
  var nombreFull     = config[empresa].nombreFull
      obj.logo       = config[empresa].logo
      obj.data.logo  = config[empresa].logo
      obj.data.color = config[empresa].color
  
  var server        = email.server.connect(emailData);
  var plantillaMail = path.join(process.cwd(), 'template_mail', obj.template + '.pug');
  var options       = {
    obj: obj.data
  }

  var body = pug.renderFile(plantillaMail, options)
  var emails = `${obj.to}, ${obj.data.emailVendedor}`
  if (config.dev) {
    console.log('Deberia enviarse a', obj.to, 'y ', obj.bcc,' pero es dev')
    emails = 'nalvarado@datacont.com'
    obj.bcc = ''
  } else {
    obj.bcc = 'fbenavides@datacont.com'
  }
  
  var mensaje =   {
    text      : obj.prefix + " " + obj.subject,
    from      : `Nueva ${obj.from} de ` + nombreFull + "<" + "efacturas@datacont.com" + ">",
    to        : emails,
    bcc       : obj.bcc,
    subject   : obj.subject,
    attachment: 
    [
      {
        data       : body,
        alternative: true,
      },
      {
        data: fs.readFileSync(obj.data.adjunto),
        name: `documento_${obj.data.numero_doc}.pdf`,
        type: "application/pdf"
      }
    ]
  };
  
  server.send(mensaje, function(err, message) {
    if (err) {
      console.error('Error al enviar mail: ', err.message)
      callback(err.message)
    } else  callback()
  });
}

exports.send           = send
exports.sendAlone      = sendAlone
exports.sendAttachment = sendAttachment