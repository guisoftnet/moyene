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
var configRoutes;
// ------------- END MODULE SCOPE VARIABLES ---------------
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
    response.send({ title: 'lista ' + request.params.obj_type });
});

app.post( '/:obj_type/create', function ( request, response ) {
    response.send({ title: request.params.obj_type + ' criado' });
});

app.get( '/:obj_type/read/:id([0-9]+)',
    function ( request, response ) {
    response.send({
        title:  request.params.obj_type  + ' o com id ' + request.params.id  + ' encontrado'
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
