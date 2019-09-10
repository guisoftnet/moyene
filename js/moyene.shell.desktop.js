/*
 * moyene.shell.desktop.js
 *  Modulo shell desktop - Gerir multiplas interfaces  
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.desktop = (function () {
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
  
    configMap = {
      main_html : String()
      + '<div id="moyene_shell_desktops_container ">'
      + ' <ul class="moyene-shell-desktop-container">'
      + ' </ul>'
      + '</div>'

    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},  
    setJqueryMap, configModule, initModule, _context_menu;
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
      $widget   : $container.find('.moyene-shell-desktop-container'),
      $icons    : $container.find('.moyene-shell-desktop-container')


    };
  };
  // fim metodo DOM  /setJqueryMap/


  
// Inicio metodo DOM  /context-menu/
// Proposito : listar  acoes possiveis no desktop
// Argumento : nenhum
// Definicoes : nenhum
// Retorno : nenhum
// Excecao : nenhum
//
_context_menu = function (){
    jqueryMap.$container.addClass("context-menu-desktop")

$.contextMenu({
    selector: '.context-menu-desktop', 
    zIndex: 10,
    callback: function(key, options) {
       },
    items: {
        "new": {name: "Criar Novo", "items": {
          "folder": {name: "Directorio", icon: "folder"},
          "sep4": "---------",
          "file": {name: "Ficheiro Texto", icon: "file"},
          "file_html": {name: "Ficheiro HTML", icon: "web"},
          "file_md": {name: "Ficheiro MDbook", icon: "web"},
          "sep5": "---------",
          "contact": {name: "Contacto", icon: "address-card"},
          "message": {name: "Mensagem", icon: "fa fa-envelop"},

        }},
        "icons": {name: "icons", icon: "cut"},
       copy: {name: "colar conteudo clipboard", icon: "copy"},
        "undo": {name: "Desfazer acao", icon: "paste"},
        "refresh": {name: "Refrescar ambiente trabalho", icon: "reload"},
        "sep1": "---------",
        "run": {name: "Executar comando", icon: "reload"},
        "widget": {name: "Adicionar Ferramenta", icon: "reload"},
        "panel": {name: "Adicionar Painel", icon: "reload"},
        "activity": {name: "Actividade", icon: "reload"},
        "sep2": "---------",
        "lock": {name: "Trancar Sessao", icon: "lock"},
        "quit": {name: "Sair", icon: function(){
            return 'context-menu-icon context-menu-icon-quit';
        }},
        "sep3 ": "---------",
        "filesystem": {name: "Abrir no Sistema de Ficheiro", icon: "reload"},
        "configure": {name: "Configurar Ambiente de Trabalho", icon: "reload"},

    }
});

}
// fim metodo DOM  /context-menu/

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
    // _context_menu();
    
    moyene.shell.desktop.widget.configModule( {} );
    moyene.shell.desktop.widget.initModule( jqueryMap.$widget );

    moyene.shell.desktop.icons.configModule( {} );
    moyene.shell.desktop.icons.initModule( jqueryMap.$icons );

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