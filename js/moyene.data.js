
 /*
 * moyene.data.js
 * Modulo rensponsavel buscar e enviar dados ao servidor
 */

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/

/* global $, io, moyene */
moyene.module = (function () {
  'use sctrict'
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
      stateMap = {
        sio: null
      },
      makeSio, getSio, initModule;
    
  //----------------- FIM MODULO ESCOPO VARIAVEL ---------------
  
  makeSio = function () { 
    var socket = io.connect( '/chat' );

    return {
      emit : function( event_name, data ) {
        socket.emit( event_name,data );
      },
      on  : function ( event_name, callback) { 
        socket.on( event_name, function () { 
          callback( arguments );
         });
      } 
    };
   };

   getSio = function () {
    if ( ! stateMap.sio ) { stateMap.sio = makeSio }
    return stateMap.sio;
   }

   initModule = function () {};
   
    return {
      getSio: getSio,
      initModule: initModule
    };
    //-------------------  FIM METODOS PUBLICOS ---------------------
  }());