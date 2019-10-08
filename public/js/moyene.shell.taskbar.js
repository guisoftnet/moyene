/*
 * moyene.shell.taskbar.js
 * Modulo responsavel pela barra de tarefa 
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.taskbar = (function () {
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
  
    configMap = {
      main_html : String()
      + '<div class="moyene-shell-taskbar">'

      + '<a class="moyene-shell-taskbar-menu ">'
      +   '<i class="lni-rocket"> </i>'
      + '</a>'
      + '<div class="moyene-shell-taskbar-container"></div>'
      + '<div class="moyene-shell-taskbar-notify-container">'
      +   '<div class="moyene-shell-taskbar-notify-icon connect-model"><i class="la la-signal"></i></div>'
      +   '<div class="moyene-shell-taskbar-notify-icon batery"><i class="la la-battery-3"></i></div>'
      +   '<div  class=" dropup">'      
      +   ' <div id="dropdownVolume" class="moyene-shell-taskbar-notify-icon volume" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="la la-volume-up"></i> </div>'
      + '   <div class="dropdown-menu moyene-bg" aria-labelledby="dropdownVolume">'
      + '     <h6 class="dropdown-header text-center">Volume</h6>'
      + '     <div class="slidecontainer">'
      + '     <input type="range" min="1" max="100" value="5" class="slider" id="myRange">'
      + '     </div>'
      + '   </div>'
      + '</div>'
      + '</div>'


      // +   '<div class="moyene-shell-taskbar-notify-icon signal"><i class="lni-chevron-up"></i></div>'
      + '</div>'

    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, onTapmenu, setDropdownNotifyicon, _context_menu
    ;
  //----------------- FIM MODULO ESCOPO VARIAVEL ---------------

  //------------------- INICIO METODOS UTILITARIO ------------------
  // example : getTrimmedString
  //-------------------- FIM METODOS UTILITARIO -------------------

  //--------------------- INICIO METODO DOM  --------------------
  // Inicio metodo DOM /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    stateMap.$container = $container;

    jqueryMap = {
      $container: $container,
      $menu     : $container.find('.moyene-shell-taskbar-menu ')
    };
  };


  // fim metodo DOM  /setJqueryMap/


  setDropdownNotifyicon = function() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
  

  }


  
// Inicio metodo DOM  /context-menu/
  // Proposito : listar  acoes possiveis no desktop
  // Argumento : nenhum
  // Definicoes : nenhum
  // Retorno : nenhum
  // Excecao : nenhum
  //
  _context_menu = function (){
    jqueryMap.$container.addClass("context-menu-taskbar")
    $.contextMenu({
        selector: '.context-menu-taskbar', 
        callback: function(key, options) {
            var m = "clicked: " + key;
        },
        items: {
    
            "showDesktop": {name: "Mostrar Ambiente de Trabalho"},
            "config": {name: "configurar"},
     

        }
    });

  
 }
  // fim metodo DOM  /context-menu/
  //---------------------- FIM METODO DOM ---------------------

  //------------------- INICIO MANIPULADOR EVENTO -------------------
  

  // Inicio manipulador evento /onTapmenu/
  // Proposito : Abrir o menu de aplicacoes e servicos
  // Argumento : 
  //  * event - Objecto evento
  //  *
  // Definicoes :
  //  * 
  // Retorno : 
  // Excecao : 
  //
  onTapmenu = function (event) {
    // alert("dentro;")
    $.gevent.publish(
      'moyene-toggle-launcher',
      []
    );
    return false;
  }

  // Fim manipulador evento /onClicklauncher/

  //-------------------- FIM INICIO MANIPULADOR EVENTO --------------------

  //------------------- INICIO METODOS PUBLICOS -------------------


  // Inicio metodos publicos /configModulo/
  // Proposito : 
  // Argumento : 
  //  *
  //  *
  // Definicoes :
  //  * 
  // Retorno : 
  // Excecao : 
  //
  configModule = function (input_map) {
    moyene.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    });
    return true;
  };
  // fim metodo publico /configModulo/

  // Inicio metodo publico /initModule

  // Proposito : 
  // Argumento :
  // * 
  // Retorno : 
  // Excecao : 
  //
  initModule = function ($container) {
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();
    setDropdownNotifyicon();
    // _context_menu();/

    //  publicar e subscrever eventos
    jqueryMap.$menu.click(onTapmenu);

    return true;
  };
  // fim metodo publico /inicModulo/

  // retornar metodos publicos
  return {
    configModule: configModule,
    initModule: initModule
  };
  //-------------------  FIM METODOS PUBLICOS ---------------------
}());