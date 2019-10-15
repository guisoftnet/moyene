/*
* crud.js - Modulo responsavel pelo CRUD da BD
*/


/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false, 
white : true
*/
/*global */


// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var 
  checkType, constructObj, readObj,dbInstance, checkSchema,
  updateObj, destroyObj, loadSchema, clearIsOnline,
  mongodb       = require( 'mongodb' ).mongoClient,
  makeMongoId   = require( 'mongodb' ).ObjectID,
  fsHandle      = require( 'fs'      ),
  JSV           = require( 'JSV'     ).JSV,
  mongoClient   = require( 'mongodb' ).MongoClient,
  assert        = require( 'assert'  ),
//   cache         = require( './cache' ),

  url         = 'mongodb://localhost:27017',
  dbName      = 'moyene',
  objTypeMap  = { 'user' : {} },

  validator     = JSV.createEnvironment(),
  objTypeMap    = { 'user' : {} };
  ;

// ------------- END MODULE SCOPE VARIABLES ---------------

// --------------- BEGIN UTILITY METHODS ------------------
const findDocuments = function(db, obj_type, filter={}, callback) {
    const collection = db.collection(obj_type);
    collection.find(filter).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  };

  const insertDocuments = function(obj_type, obj_map_list, callback) {
    const collection = dbInstance.collection(obj_type);

    collection.insert(obj_map_list, function(err, result) {
        if ( err ) callback(err, null);
        console.log("Inserted " + result +" documents into the collection");
        callback(null, result);
    });
  };

  const updateDocument = function(obj_type, find_map, obj_map, callback) {
    const collection = dbInstance.collection(obj_type);
    collection.updateOne(find_map
      , { $set: obj_map }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Registo actualizado");
      callback(result);
    });
  };
  
  const removeDocument = function( obj_type, find_map, callback ) {
    const collection = dbInstance.collection( obj_type );
    collection.deleteOne(find_map, function(err, result) {
        if (err ) 
            callback(err, null)
        else
            callback(null, result);
    });
  };

loadSchema = function ( schema_name, schema_path ) {
    fsHandle.readFile( schema_path, 'utf8', function ( err, data ) {
        objTypeMap[ schema_name ] = JSON.parse( data );
    });
};

checkSchema = function ( obj_type, obj_map, callback ) {
    var 
      schema_map = objTypeMap[ obj_type ],
      report_map = validator.validate( obj_map, schema_map );
   callback( report_map.errors );
}

clearIsOnline = function () {
    updateObj(
        'user',
        { is_online : true },
        { is_online : false},
        function ( response_map ) {
            console.log( 'Todos usuario offline ' + response_map );
        }
    );
};
// ---------------- END UTILITY METHODS -------------------

// ------------- BEGIN SERVER CONFIGURATION ---------------

// -------------- END SERVER CONFIGURATION ----------------
// ----------------- BEGIN START SERVER -------------------

// ------------------ END START SERVER --------------------


// ----------------- BEGIN PUBLIC METHODS -------------------
checkType = function ( obj_type ) {
    if ( ! objTypeMap[ obj_type ] ) {
        return ({ error_msg : 'Tipo Objecto "' + obj_type + '" nao eh suportado.'});
    }
    return null;
};
constructObj = function ( obj_type, obj_map, callback ) {
    var type_check_map = checkType( obj_type );
    if ( type_check_map ) {
        callback( type_check_map );
        return;
    }
    checkSchema(
        obj_type, obj_map,
        function( error_list ) {
            if ( error_list.length === 0 ) {
                console.log('form ' +  request.body)
                insertDocuments(obj_type, obj_map, function(err, result_map) {
                    var options_map = { safe : true };

                    if ( err )
                        response.send({ result: "ERRO " + err  });
                    else
                        response.send(result_map);
                })
            } else {
                response.send({
                    error_msg   : 'Documento invalido',
                    error_list  : error_list
                });
            }
        }
    );
};
readObj = function ( obj_type, find_map, fields_map, callback ) {
    var
      type_check_map = checkType( obj_type ),
      find_map = {};
    if ( type_check_map ) {
        callback( type_check_map );
        return;
    }
    // cache.getValue(find_map, callback, function () {
        findDocuments(dbInstance, obj_type, find_map, function(map_list) {
            // cache.setValue( find_map, map_list );
            callback( map_list )
        // });        
    })

};


updateObj = function ( obj_type, find_map, set_map, callback ) {
    var type_check_map = checkType( obj_type );
    if ( type_check_map ) {
        callback( type_check_map );
        return;
    }
    checkSchema(
        obj_type, set_map,
        function ( error_list ) {
            if ( error_list.length === 0 ) {
                updateDocument(obj_type, find_map, set_map, function(update_count ) {
                    callback( {update_count : update_count});
                });
            } else {
                callback({
                    error_msg   : 'Documento nao valido',
                    error_list  : error_list
                });
            }
        }
    )
};
destroyObj = function ( obj_type, find_map, callback ) {
    var type_check_map = checkType( obj_type );
    if ( type_check_map ) {
        callback( type_check_map );
        return;
    }
    // cache.deleteKey( find_map );
     removeDocument(obj_type, find_map, function(result) {
         callback(result);
     })
    
};

// ----------------- END PUBLIC METHODS -------------------

// ------------- BEGIN MODULE INITIALIZATION --------------

mongoClient.connect(url, function ( err, client ) {
    assert.equal( null, err );
    console.log( "conectado ao servidor BD com sucesso" );
    clearIsOnline();
    dbInstance = client.db( dbName );
});

//
// Carregar esquema ao memoria 
//
(function() {
    var schema_name, schema_path;
    for ( schema_name in objTypeMap ) {
        if ( objTypeMap.hasOwnProperty( schema_name ) ) {
            schema_path = __dirname + '/' + schema_name + '.json';
            loadSchema( schema_name, schema_path );
        }
    }
}());
// -------------- END MODULE INITIALIZATION ---------------

module.exports = {
    makeMongoId : makeMongoId,
    checkType   : checkType,
    contruct    : constructObj,
    read        : readObj,
    update      : updateObj,
    destroy     : destroyObj
};