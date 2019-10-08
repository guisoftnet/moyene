/*
* routes.js - Modulo provedor de rotas url 
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
var configRoutes,dbInstance,
    mongoClient = require( 'mongodb' ).MongoClient,
    assert      = require( 'assert' ),

    url         = 'mongodb://localhost:27017',
    dbName      = 'moyene'


    mongoClient.connect(url, function ( err, client ) {
    assert.equal( null, err );
    console.log( "conectado ao servidor bd com sucesso" );
     dbInstance = client.db( dbName );
     console.log(dbInstance)
    // client.close();
});


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
  }

  const insertDocuments = function(obj_type, obj_map_list, callback) {
    const collection = dbInstance.collection(obj_type);

    collection.insertMany(obj_map_list, function(err, result) {
        if ( err ) callback(err, null);
        assert.equal(err, null);
        assert.equal(obj_map_list.length, result.result.n);
        assert.equal(obj_map_list.length, result.ops.length);

        console.log("Inserted " + obj_map_list.length +" documents into the collection");

        callback(null, result);
    });
  }
// --------------- END UTILITY METHODS --------------------

// ---------------- BEGIN PUBLIC METHODS ------------------

configRoutes = function ( app, server ) {
app.get( '/', function ( request, response ) {
    response.redirect( '/moyene.html' );
});

app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
})

app.get( '/:obj_type/list', function ( request, response ) {
   console.log(request.params.obj_type);
    findDocuments(dbInstance, request.params.obj_type, {}, function(map_list) {
        response.send(map_list);

    });
});

app.post( '/:obj_type/create', function ( request, response ) {
    insertDocuments(obj_type, request.body, function(err, result_map) {
        if ( err )
            response.send({ result: "ERRO"});
        else
            response.send(result_map);
    })
});

app.get( '/:obj_type/read/:id([0-9]+)',function ( request, response ) {    
    findDocuments(dbInstance, request.params.obj_type, request.params.id, function(map_list) {
        response.send(map_list);    
    });
});

app.post( '/:obj_type/update/:id([0-9]+)', 
    function ( request, response ) {
        response.send({
            title: request.params.obj_type + ' com o id ' + request.params.id + ' foi actualizado'
        });
    }
);

app.get( '/:obj_type/delete/:id([0-9]+)',
    function ( request, response ) {
        response.send({
            title: request.params.obj_type + ' com o id ' + request.params.id + ' foi removido'
        });
    }    
);

}
module.exports = { configRoutes : configRoutes }
// ----------------- END PUBLIC METHODS -------------------
