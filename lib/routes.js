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
var configRoutes,
    crud        = require( './crud' ),
    chat        = require( './chat' ),
    makeMongoId =  crud.makeMongoId ;


   


// ------------- END MODULE SCOPE VARIABLES ---------------

// --------------- END UTILITY METHODS --------------------

// ---------------- BEGIN PUBLIC METHODS ------------------

configRoutes = function ( app, server ) {
app.get( '/', function ( request, response ) {
    response.redirect( '/moyene.html' );

});

app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    if ( objTypeMap[ request.params.obj_type ] ) {
        next();
    } else {
        response.send( { error_msg : request.params.obje_type  + ' nao eh um objecto valido' } );
    }
});

app.get( '/:obj_type/list', function ( request, response ) {
   crud.read(
       request.params.obj_type,
       {}, {},
       function ( map_list ) { response.send( map_list ); }
   );
});

app.post( '/:obj_type/create', function ( request, response ) {
    crud.contruct(
        request.params.obje_type,
        request.body,
        function ( result_map ) { response.send( result_map ); }
    );
});

app.get( '/:obj_type/read/:id',function ( request, response ) {    
    crud.read(
        request.params.obj_type,
        { _id : makeMongoId( request.params.id ) }, {},
        function ( map_list ) { response.send( map_list ); }
    );
});

app.post( '/:obj_type/update/:id', function ( request, response ) {
    crud.read(
        request.params.obj_type,
        { _id : makeMongoId( request.params.id ) }, 
        request.body,
        function ( result_map ) { response.send( result_map ); }
    );
});

app.get( '/:obj_type/delete/:id([0-9]+)',function ( request, response ) {
    crud.read(
        request.params.obj_type,
        { _id : makeMongoId( request.params.id ) }, 
        function ( result_map ) { response.send( result_map ); }
    );
});

chat.connect ( server );
}
module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------

// ----------------- END  METHODS -------------------

// ------------- BEGIN MODULE INITIALIZATION --------------

// ------------- END MODULE INITIALIZATION --------------