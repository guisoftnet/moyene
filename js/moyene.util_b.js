/**
 * spa.util_b.js
 * JavaScript browser utilities
 *
 * Compiled by Michael S. Mikowski
 * These are routines I have created and updated
 * since 1998, with inspiration from around the web.
 * MIT License
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, moyene, getComputedStyle */

moyene.util_b = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      regex_encode_html  : /[&"'><]/g,
      regex_encode_noamp : /["'><]/g,
      html_encode_map    : {
        '&' : '&#38;',
        '"' : '&#34;',
        "'" : '&#39;',
        '>' : '&#62;',
        '<' : '&#60;'
      }
    },

    decodeHtml,  encodeHtml, getEmSize, dragElement;

  configMap.encode_noamp_map = $.extend(
    {}, configMap.html_encode_map
  );
  delete configMap.encode_noamp_map['&'];
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // Begin decodeHtml
  // Decodes HTML entities in a browser-friendly way
  // See http://stackoverflow.com/questions/1912501/\
  //   unescape-html-entities-in-javascript
  //
  decodeHtml = function ( str ) {
    return $('<div/>').html(str || '').text();
  };
  // End decodeHtml


  // Begin encodeHtml
  // This is single pass encoder for html entities and handles
  // an arbitrary number of characters
  //
  encodeHtml = function ( input_arg_str, exclude_amp ) {
    var
      input_str = String( input_arg_str ),
      regex, lookup_map
      ;

    if ( exclude_amp ) {
      lookup_map = configMap.encode_noamp_map;
      regex      = configMap.regex_encode_noamp;
    }
    else {
      lookup_map = configMap.html_encode_map;
      regex      = configMap.regex_encode_html;
    }
    return input_str.replace(regex,
      function ( match, name ) {
        return lookup_map[ match ] || '';
      }
    );
  };
  // End encodeHtml

  // Begin getEmSize
  // returns size of ems in pixels
  //
  getEmSize = function ( elem ) {
    return Number(
      getComputedStyle( elem, '' ).fontSize.match(/\d*\.?\d*/)[0]
    );
  };
  // End getEmSize



  //inicio /dragElement/
  dragElement = function (elmnt) {
    var last_zIndex,
      pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    // if (document.getElementById(elmnt.id + "header")) {
    //   /* if present, the header is where you move the DIV from:*/
    //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    // } else {
    //   /* otherwise, move the DIV from anywhere inside the DIV:*/
    // }


    elmnt.onmousedown = dragMouseDown;
    last_zIndex = elmnt.style.zIndex;



    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // obter a posicao inicial do mouse
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // chamar a funcao sempre que se mover
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calcular para a nova posicao
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elmnt.style.zIndex = 10;
      // definir o elemento para a nova posicao
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      elmnt.style.cursor = "move";
    }

    function closeDragElement() {
      /* Parar de mover quando depois de soltar o butao*/
      document.onmouseup = null;
      document.onmousemove = null;
      elmnt.style.zIndex = last_zIndex;
      elmnt.style.cursor = "pointer";


    }
  }

  //fim /dragElement/



  // export methods
  return {
    decodeHtml  : decodeHtml,
    encodeHtml  : encodeHtml,
    getEmSize   : getEmSize,
    dragElement : dragElement,
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
