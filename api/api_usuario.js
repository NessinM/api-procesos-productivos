var util = require('./util.js')
    ,sql = require('mssql')
    ;
    
const TABLE_NAME = 'usuario'

var getOne = function(usuario, callback){
  
  util.getConnection(function(err, con){
    if (err) {
      callback(err)
      return
    }

    var query = `select * from ${TABLE_NAME} where usuario = @usuario`;
    var request = new sql.Request(con);
    request.input('usuario', usuario);
    request.query(query, function(err, recordset){
      con.close();
      if (recordset.length > 0 && recordset[0].usuario == usuario) {
        callback(null, true, recordset[0])
      } else {
        callback(err, false)
      }
    });
  });
}

var get = function(obj, callback){
  var keys = Object.keys(obj)

  var arrayKeys = []
  
  for (var i = 0; i < keys.length; i++) {
    var element = keys[i];
    arrayKeys.push(`${element} = @${element}`)
  }

  var queryFields = arrayKeys.join(' and ')
  
  util.getConnection(function(err, con){
    if (err) {
      callback(err)
      return
    }

    var query = `select * from ${TABLE_NAME}`;

    if (keys.length > 0) {
      query += ` where ${queryFields}`
    }

    var request = new sql.Request(con);
    //Agregamos los inputs
    for (var i = 0; i < keys.length; i++) {
      var element = keys[i];
      request.input(element, obj[element]);
    }

    request.query(query, function(err, recordset){
      con.close();
      if (recordset && recordset.length) callback(err, recordset.length, recordset)
      else callback(err, 0, [])
    });
  });
}

var builtGet = function(query, obj, callback){
  var keys = Object.keys(obj)

  var arrayKeys = []
  
  util.getConnection(function(err, con){
    if (err) {
      callback(err)
      return
    }

    var request = new sql.Request(con);
    //Agregamos los inputs
    for (var i = 0; i < keys.length; i++) {
      var element = keys[i];
      request.input(element, obj[element]);
    }
    console.log('query:', query)
    request.query(query, function(err, recordset){
      con.close();
      if (recordset) callback(err, recordset.length, recordset)
      else callback(err, 0, [])
    });
  });
}

var insert = function(obj, callback) {
  
  var keys = Object.keys(obj)
  
  if (keys.length === 0) {
    console.log('No inserta porque no mando nada: ');
    callback(null, 0)
    return;
  }

  var arrayFieldsQuery = []
  var arrayParametersQuery = []
  for (var i = 0; i < keys.length; i++) {
    var element = keys[i];
    arrayFieldsQuery.push(element)
    arrayParametersQuery.push(`@${element}`)
  }

  var queryFields = arrayFieldsQuery.join(',')
  var queryValues = arrayParametersQuery.join(',')

  let query = `
    insert into ${TABLE_NAME} 
    (
    ${queryFields}
    )
    values
    (
    ${queryValues}
    );'
  `

  try {
    util.getConnection(function(err, con){
      if (err) {
        callback(err)
        return
      }
  
      // var query = query;
      var request = new sql.Request(con);

      //Agregamos los inputs
      for (var i = 0; i < keys.length; i++) {
        var element = keys[i];
        request.input(element, obj[element]);
      }

      request.query(query, function(err, recordset){
        con.close();
        if (err) {
          callback(err)
          return
        }
        callback(err, true)
      });
    })
  } catch (error) {
    // if (con) con.close()
    callback(error)
  }

}

//Lo que mandes en el objeto se va a actualizar
var update = function(key, obj, callback) {
  var keys = Object.keys(obj)
  
  if (keys.length === 0) {
    console.log('No actualiza porque no cambio nada: ')
    callback(null, 0)
    return;
  }

  var arrayKeys = []
  for (var i = 0; i < keys.length; i++) {
    var element = keys[i];
    arrayKeys.push(`${element} = @${element}`)
  }
  var queryMiddle = arrayKeys.join(',')

  let query = `
    update ${TABLE_NAME}
    set 
    ${queryMiddle}
    where
    usuario = @key
  `

  try {
    util.getConnection(function(err, con){
      if (err) {
        callback(err)
        return
      }
      // var query = query;
      var request = new sql.Request(con);

      //Agregamos los inputs
      for (var i = 0; i < keys.length; i++) {
        var element = keys[i];
        request.input(element, obj[element]);
      }

      request.input('key', key);
      request.query(query, function(err, a, affected){
        con.close();
        callback(err, affected)
      });
    })
  } catch (error) {
    if (con) con.close()
    callback(error)
  }

}

exports.insert   = insert
exports.get      = get
exports.builtGet = builtGet
exports.getOne   = getOne
exports.update   = update