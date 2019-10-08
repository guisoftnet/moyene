/*
* app.js - Servidor express simples
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
    http = require( 'http' ),
    express = require( 'express' ),
    body_parser = require('body-parser'),
    method_override = require('method-override'),
    routes = require('./routes'),
    app = express(),
    server = http.createServer( app ),
    dev_enviroment;

// ------------- END MODULE SCOPE VARIABLES ---------------
// ------------- BEGIN SERVER CONFIGURATION ---------------


dev_enviroment = app.get('env');
app.use(body_parser.urlencoded({
    extended: true
}) );
app.use( method_override() );
app.use( express.static( __dirname + '/public' ) );
// app.use( app.router );

if ( dev_enviroment === 'development' ) {
    // app.use( logger );
    // app.use( error_handler({
    //     dumpExceptions : true,
    //     showStack      : true
    // }) );
}

if ( dev_enviroment === 'production' ) {
    // app.use( error_handler () );
};

routes.configRoutes( app, server );
// -------------- END SERVER CONFIGURATION ----------------
// ----------------- BEGIN START SERVER -------------------
server.listen( 3000 );
    console.log(
    'Servidor Express na porta %d em modo %s',
    server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------