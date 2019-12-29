/*
 * modulo_template.js
 * Template 
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.signup = (function () {
    'use strict'
  
    //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
    var
    
      configMap = {
        main_html : String()
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
        + ''
  
      },
      stateMap = {
        $container: null
      },
      jqueryMap = {},
      setJqueryMap, configModule, initModule;
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
        $container: $container
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