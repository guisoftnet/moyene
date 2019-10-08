/*
 * moyene.shell.windows.js
 * Modulo responsavel pelo ciclo de vida de janela e seus eventos 
 * 
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.windows = (function () {
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
  
    configMap = {
      main_html : String()
      + '<div class="moyene-shell-window-outer moyene-glass">'
      + '   <div class="moyene-shell-window-inner">'
      + '     <div class="moyene-shell-window-content">'
      + '       <div class="moyene-shell-window-titlebar">'
      + '         <div class="moyene-shell-window-title">'
      + '           <img class="moyene-shell-window-titlebar-icon" valign="middle" src="/assets/themify-icons/SVG/folder.svg">'
      + '           <span class="moyene-shell-window-titlebar-text">Ficheiro</span>'
      + '           <span class="moyene-shell-window-titlebar-descricao"></span>'
      + '           <div class="moyene-shell-window-title-button-bar">'
      + '             <a class="action-button close " href="#"></a>'
      + '             <a class="action-button maximize " href="#"></a>'
      + '             <a class="action-button minimize " href="#"></a>'
      + '           </div>'
      + '         </div>'
      + '       </div>'
      + '       <div class="moyene-shell-window-body">'
      + '         <div class="moyene-shell-window-body-area">'
      + '           <div class="moyene-shell-window-toolbar"></div>'
      + '           <div class="moyene-shell-window-container"></div>'
      + '         </div>'
      + '       </div>'
      + '     </div>'
      + '   </div>'
      + ' </div>'

    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, onCreate, onDestroy, onOpen, 
    onClose, onMinimize, onMaximize, isHidden, show
    ;
  //----------------- FIM MODULO ESCOPO VARIAVEL ---------------

  //------------------- INICIO METODOS UTILITARIO ------------------

  //-------------------- FIM METODOS UTILITARIO -------------------

  //--------------------- INICIO METODO DOM  --------------------
  // Inicio metodo DOM /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    stateMap.$container = $container;

    jqueryMap = {
      $container: $container,
      $btnClose: $container.find('.action-button.close'),
      $btnMaximize: $container.find('.action-button.maximize '),
      $btnMinimize: $container.find('.action-button.minimize'),
      $titlebar:    $container.find('.moyene-shell-window-titlebar')
    };
  };

  // fim metodo DOM  /setJqueryMap/


  // inicio metodo DOM  /isHidden/

  isHidden = function() {
   return  jqueryMap.$container.hasClass('moyene-window-hide');
  }
  // fim metodo DOM  /isHidden/


  // inicio metodo DOM  /open/
  // Proposito  : Abrir uma janela se estiver escondido
  // Argumento  :   
  //  * event   : objecto evento 
  //  * app: mapa com metadados da aplicacao 
  // Definicoes : nenhuma
  // Retorno : false - terminar o evento 
  // Excecao : nenhuma
  //
  open = function () {
    if (isHidden()) { jqueryMap.$container.removeClass('moyene-window-hide'); return true;} 
     return false;
  }
  // fim metodo DOM  /open/

  //---------------------- FIM METODO DOM ---------------------

  //------------------- INICIO MANIPULADOR EVENTO -------------------
// Inicio manipulador evento /onStartwindow/
  // Proposito  : Inicializar janela de uma aplicacao 
  //     e configurar usando valores passado pelo parametro
  // Argumento  :   
  //  * event   : objecto evento 
  //  * app: mapa com metadados da aplicacao 
  // Definicoes : nenhuma
  // Retorno : false - terminar o evento 
  // Excecao : nenhuma
  //
  onCreate = function( event, app) {
    open();
    return false;
  }
  // Fim manipulador evento /onStartwindow/

  //-------------------- FIM INICIO MANIPULADOR EVENTO --------------------
  // Inicio metodos publicos /onClose/

  onClose = function(event) {
    if ( !isHidden() ) {
      jqueryMap.$container.addClass('moyene-window-hide');
     } 

   return false;
  }
  // Fim metodos publicos /onClose/


    // Inicio metodos publicos /onMinimize/

  onMinimize = function(event) {
      
    if ( !isHidden() ) {
      jqueryMap.$container.addClass('moyene-window-hide');
     } 

   return false;
  }
    // Fim metodos publicos /onMinimize/

  // Inicio metodos publicos /onMaximize/

  onMaximize = function(event) {
  
    if ( !isHidden() ) {
      jqueryMap.$container.addClass('moyene-window-hide');
     } 
    $.gevent.publish(
      'moyene-window-maximize',
      []
    );

    return false;
  }
  // Fim metodos publicos /onMaximize/    
  
  //------------------- INICIO METODOS PUBLICOS -------------------


  // Inicio metodos publicos /configModulo/
  // Proposito    : configurar a janela para aplicacao alvo
  // Argumento    : 
  //  * input_map : mapa com metadados da aplicacao
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
  // Proposito : inicializar o window e manipuladores de eventos 
  // Argumento :
  // * 
  // Retorno : 
  // Excecao : 
  //
  initModule = function ($container) {
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // anexar eventos da janela
    jqueryMap.$btnMinimize.click(onMinimize);
    jqueryMap.$btnMaximize.click(onMaximize);
    jqueryMap.$titlebar.dblclick(onMaximize);
    moyene.util_b.dragElement(jqueryMap.$container.get(0));
    jqueryMap.$btnClose.click(onClose);


    // executar eventos enviados a janela
    $.gevent.subscribe($('.moyene-shell-desktop-icon'),
      'moyene-create-window',
      onCreate
    )
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