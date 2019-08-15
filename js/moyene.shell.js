/*
 * moyene.shell.js
 * Modulo shell para moyene 
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, spa */
moyene.shell = (function () {
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
    configMap = {

      main_html : String()
        + '<div class="container">'
        + '   <div id="moyene_shell_block_desktop" class="context-menu-one">'
        + '   </div>'
        + '</div>'
        + '<div id="moyene_shell_block_topnav">'
        + '</div>'
        + '<div id="moyene_shell_block_taskbar">'
        + '</div>'
        + '<div class="moyene-shell-window start-center moyene-ui-draggable moyene-window-hide">'
        + '</div>'
        + '<div class="moyene-shell-launcher">'        
        + '</div>'
     
    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule;
  //----------------- FIM MODULO ESCOPO VARIAVEL ---------------

  //------------------- INICIO METODOS UTILITARIO ------------------
  //-------------------- FIM METODOS UTILITARIO -------------------

  //--------------------- INICIO METODO DOM  --------------------
  // Inicio metodo DOM /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $navbar   : $container.find('#moyene_shell_block_topnav'),
      $desktop : $container.find('#moyene_shell_block_desktop'),
      $taskbar : $container.find('#moyene_shell_block_taskbar'),
      $windows   : $container.find('.moyene-shell-window'),
      $launcher   : $container.find('.moyene-shell-launcher')


    };
  };
  // fim metodo DOM  /setJqueryMap/



  //---------------------- FIM METODO DOM ---------------------



  //------------------- INICIO MANIPULADOR EVENTO -------------------
  // example: onClickButton = ...
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

  // Proposito : inicializar todos componentes do sistema
  // Argumento : 
  // * $container - elemento alvo onde anexar html
  // Retorno : true
  // Excecao : nenhuma
  //
  initModule = function ( $container ) {

    // carregar HTML e mapa de colecao jquery 
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();
    moyene.shell.navbar.configModule( {} );
    moyene.shell.navbar.initModule( jqueryMap.$navbar );

    moyene.shell.desktop.configModule( {} );
    moyene.shell.desktop.initModule( jqueryMap.$desktop );

    moyene.shell.taskbar.configModule( {} );
    moyene.shell.taskbar.initModule( jqueryMap.$taskbar );

    moyene.shell.windows.configModule( {} );
    moyene.shell.windows.initModule( jqueryMap.$windows );

    
    moyene.shell.launcher.configModule( {} );
    moyene.shell.launcher.initModule( jqueryMap.$launcher );


    $.gevent.subscribe($container, 'moyene-toggle-launcher',   function (event, param) {
       moyene.shell.launcher.toggle()
      } )

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