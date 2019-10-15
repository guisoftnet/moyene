/*
* chat.js - module to provide chat messaging
*/
/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global */
// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict'
var 
  chatObj, emitUserList, signIn, signOut,
  socket = require( 'socket.io' ),
  crud   = require( './crud' ),
  
  makeMongoId  = crud.makeMongoId,
  chatterMap   = {};
// ------------ END MODULE SCOPE VARIABLES --------------

// ---------------- BEGIN UTILITY METHODS -----------------
/**
 *  EmitUserList - broadcast user list to all connected clients
 * 
 */
emitUserList = function ( io ) {
    crud.read(
        'user',
        { is_online : ture },
        {},
        function ( result_list ) {
            io
              .of( '/chat' )
              .emit( 'listchange', result_list );
        }
    );
};

/**
 * signIn - update is_online property and chatterMap
 * 
 */
signIn = function ( io, user_map, socket ) {
    crud.update(
        'user',
        { '_id' : user_map._id },
        {is_online: true },
        function ( result_map ) {
            emitUserList( io );
            user_map.is_online = true;
            socket.emit( 'userupdate', user_map );
        }
    );

    chatterMap[ user_map._id ] = socket;
    socket.user_id = user_map._id;
};
 

signOut = function ( io, user_id ) {
    crud.update(
        'user',
        { 'id' : user_id },
        { is_online : false },
        function ( result_list ) { emitUserList ( io ); }
    );

    delete chatterMap[ user_id ];
};
// ---------------- END UTILITY METHODS -----------------

// ---------------- BEGIN PUBLIC METHODS ------------------
chatObj = {
    connect : function ( server ) {
        var io = socket.listen( server );
        io 
            .serveClient( 'blacklist', [] )
            .of( '/chat' )
            .on( 'connection', function ( socket ) {

                // Inicio /adduser/ message handler
                // Sumario      : fornece mecanismo de entrada ao sistema.
                // Argumento    : unico objecto user_map.
                //      user_map eh composto por seguintes propriedades.
                //      * name  = nome do usuario
                //      * cid   = id do cliente
                // Acao         :
                //    Se o usuario que que entrar com o username existente na BD, usar
                //  o objecto existente e ignorar outros inputs.
                // 
                //        Se o usuario fornecer username que nao existe, criar um.
                //   Enviar mensagem de evento 'userupdate' para o emissor para que o ciclo de login
                // esteja completo. Certificar que o ID do cliente eh passado de volta para que o cliente
                // se relacione com o usuario, mas nao armazenar na base de dados.
                //  Marcar usuario como online e enviar a lista actualizado de usuarios online para
                // todos clientes, incluindo o usuario que originou o evento 'adduser'
                // 
                socket.on( 'adduser', function ( user_map ) {
                    crud.read(
                        'user', 
                        { name : user_map.name },
                        {},
                        function ( result_list ) {
                            var 
                              result_map,
                              cid = user_map.cid;

                            delete user_map.cid;

                            // usar usuario existente 
                            if ( result_list.length > 0 ) {
                                result_map      = result_list[ 0 ];
                                result_map.cid  = cid;
                                signIn ( io, result_map, socket );
                            }

                            // criar usuario com novo nome
                            else {
                                user_map.is_online = true;
                                crud.construct(
                                    'user',
                                    user_map,
                                    function ( result_list ) {
                                        result_map      =   result_list[ 0 ];
                                        result_map.cid  = cid;
                                        chatterMap[ result_map._id ] = socket;
                                        socket.user_id  =   result_map._id;
                                        socket.emit( 'userupdate', result_map );
                                        emitUserList( io );
                                    }
                                );
                            }
                        }
                    );
                } );

                // Fim /adduser/ mendagem handler

                socket.on( 'updatechat', function ( chat_map ) {
                    if ( chatterMap.hasOwnProperty( chatterMap.dest_id ) ) {
                        chatterMap[ chat_map.dest_id ]
                            .emit( 'updatechat', chat_map );
                    }
                    else {
                        socket.emit( 'updatechat', {
                            sender_id   : chat_map.sender_id,
                            msg_text    : chat_map.dest_name    + ' esta offline.'
                        });
                    }
                } );
                
                socket.on( 'leavechat', function () {
                    console.log(
                        '** usuario %s saiu ***', socket.user_id
                    );
                    signOut( io , socket.user_id );
                });
                socket.on( 'disconnect', function () {
                    console.log(
                        '** usuario %s fechou a janela ou tab do browser **',
                        socket.user_id
                    ); signOut ( io, socket.user_id );
                } );
                
                socket.on( 'updateavatar', function () {} );

            });
        // end io setup

        return io
    }
};

module.exports = chatObj;

// ---------------- END PUBLIC METHODS ------------------
