/*
 * moyene.storage.js
 * modulo responsavel por armazenamento e cache do lado cliente
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, moyene */

 moyene.storage = (function () {
    'use strict';

    var generateKey = function ( key ) {
        var date  = new Date(),
          datekey = new String()
                    + date.getFullYear()
                    + date.getMonth(),
                    + date.getDay();

        return key + datekey;
    }
  
    return { 
        'set' : function ( key, value ) {
            sessionStorage.setItem( generateKey ( key ), value );
        },
        'get' : function ( key ) {
            return sessionStorage.getItem( key );
        },

        'remove' : function ( key ) {
            sessionStorage.removeItem( key );
        },

        'clear' : function() {
            sessionStorage.clear();
        }
    };
  }());
  