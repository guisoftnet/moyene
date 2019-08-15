/*
 * modulo.shell.desktop.icons.js
 * Modulo responsavel pelos icons das aplicacoes no desktop 
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.desktop.icons = (function () {
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
  
    configMap = {
      main_html : String()
      + '<li class="moyene-shell-desktop-icon moyene-ui-draggable context-menu-icon">'
      +   '<div class="moyene-shell-desktop-icon_img">'
      +     '<img src="/assets//desktopIcon/notificacao.svg" role="img" aria-hidden="true">'
      +   '</div>'
      +   '<div class="moyene-shell-desktop-icon_label">'
      +     '<div class="l">Notificacao</div>'
      +     '<div class="r"></div>'
      +   '</div>'
      + ' </li>'


    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, onDoubleclick, dragIcon,  initModule, _context_menu;
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
      $icon      : $container.find('.moyene-shell-desktop-icon')
    };
  };
  // fim metodo DOM  /setJqueryMap/



  dragIcon = function (elmnt) {
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

// Inicio metodo DOM  /context-menu/
  // Proposito : listar  acoes possiveis no desktop
  // Argumento : nenhum
  // Definicoes : nenhum
  // Retorno : nenhum
  // Excecao : nenhum
  //
  _context_menu = function (){
    $.contextMenu({
        selector: '.context-menu-icon', 
        callback: function(key, options) {
            switch (key) {
              case 'open':
                  _openWindow();
                break;
            
              default:
                break;
            }
            console.log(options)
        },
        items: {
    
            "open": {name: "abrir"},
            "sep1": "---------",

            "copy": {name: "Copiar", icon: "copy"},
            "cut" : {name: "Cortar", icon: "cut"},
            // "paste": {name: "Colar", icon: "paste"},            
            "sep2": "---------",           
            "sendTo": {name: "Enviar Para", icon: "reload"},
            "compress": {name: "Comprimir", icon: "reload"},
            "sep3": "---------",
            "rename": {name: "renomear", icon: "edit"},
            "delete": {name: "apagar", icon: "delete"},
            "sep4": "---------",
            "Properties": {name: "Propriedade", icon: "reload"},

        }
    });

  
 }
  // fim metodo DOM  /context-menu/


  // inicio metodo DOM  /_openWindow/
  _openWindow  = function(param=[{titulo: "teste", aplicacao: "mensagem"}]) {
    $.gevent.publish(
      'moyene-create-window',
      param
    );
  }
  // fim metodo DOM  /_openWindow/

  //---------------------- FIM METODO DOM ---------------------

  //------------------- INICIO MANIPULADOR EVENTO -------------------


  //-------------------- FIM INICIO MANIPULADOR EVENTO --------------------

  // Inicio manipulador evento /onDoubleclick/
  // Proposito : Enviar um evento 'abrir_janela' e argumentos
  //              de configuracao para o modulo moyene.shell.windows                             
  // Argumento : 
  //  * event  : objecto evento 
  //  *
  // Definicoes : nenhuma
  //  * 
  // Retorno : false  - finalizar  o evento
  // Excecao : nenhum
  //
  onDoubleclick = function (event) {
    _openWindow();

    return false;
  }
  // Fim manipulador evento /onDoubleclick/


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
    $container.append( configMap.main_html );
    setJqueryMap();
    _context_menu();

    dragIcon(jqueryMap.$icon.get(0));
    jqueryMap.$icon
      .dblclick(onDoubleclick);

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