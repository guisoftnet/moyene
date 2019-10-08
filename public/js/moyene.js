/*
 * moyene.js
 * Root modulo namespace 
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, moyene */

var moyene = (function () {
    'use strict';
    var initModule = function ( $container ) {
    //   spa.data.initModule();
      moyene.model.initModule();
      moyene.shell.initModule( $container );
    };
  
    return { initModule: initModule };
  }());
  