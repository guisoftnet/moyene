/*
 * moyene.shell.laucher.js
 * Modulo responsavel pelo menu das aplicacoes 
 * 
 * Dercio G. C. Guirruta
 */

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/


/* global $, this, moyene */
moyene.shell.launcher = (function () {
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var
  
    configMap = {
      favorite_html: String()
      + '<div class="moyene-shell-launcher-tabview-favorite">'
      + ' <span class="text-white">Favorito</span>'
      + ' <ul class="moyene-list-group list-group-">'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/konsole.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Terminal</span>'
      + '       <span class="app-name">konsole</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/ms-word.svg"/> '
      + '     <div>'
      + '       <span class="app-description">ms-word</span>'
      + '       <span class="app-name">editor de documentos</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/telegram.svg"/> '
      + '     <div>'
      + '       <span class="app-description">telegram</span>'
      + '       <span class="app-name">rede social</span>'
      + '     </div>'
      + '   </li>'
      + '</ul>'
      + ''
      + ''
      + '</div>'
      
      ,
      application_html: String()
      + '<div class="moyene-shell-launcher-tabview-application ">'
      + ' <span class="label-launcher text-white">Aplicacoes</span>'
      + ' <ul class="moyene-list-group list-group">'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/desenvolvimento.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Desenvolvimento</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/educacao.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Educaçao</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/graphic.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Grafico</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/internet.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Internet</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/multimedia.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Multimidia</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/office.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Office</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/settings.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Definições</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>' 
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/system.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Sistema</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'           
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/toolbox.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Utilitario</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'   
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/other.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Outros</span>'
      + '     </div>'
      + '     <br>'      
      + '   </li>'                 
      + '</ul>'
      + ''

      + ''
      + '</div>'
      
      ,
      application_container_html: String()
      + ' <ul class="app-category list-group">'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/konsole.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Terminal</span>'
      + '       <span class="app-name">konsole</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/ms-word.svg"/> '
      + '     <div>'
      + '       <span class="app-description">ms-word</span>'
      + '       <span class="app-name">editor de documentos</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/telegram.svg"/> '
      + '     <div>'
      + '       <span class="app-description">telegram</span>'
      + '       <span class="app-name">rede social</span>'
      + '     </div>'
      + '   </li>'
      + '</ul>'
      ,


      home_html: String()
      + '<div class="moyene-shell-launcher-tabview-home">'
      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Aplicações</span>'

      + '   <li class="moyene-list-group-item"> <img src="/assets//desktopIcon/launcher/home/system-run.svg"/> '
      + '     <div>'
      + '       <span class="app-description">executar um comando</span>'
      + '       <span class="app-name">executar um comando ou pesquisa</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/aplication/system.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Configuração do Sistema</span>'
      + '       <span class="app-name">Configuração do Sistema</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets//desktopIcon/launcher/home/info.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Centro de Informações</span>'
      + '       <span class="app-name">Centro de Informações</span>'
      + '     </div>'
     + '   </li>' 
      + '</ul>'

      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Locais</span>'

      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Pasta Pessoa</span>'
      + '       <span class="app-name">/home/user</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Ambiente de Trabalho</span>'
      + '       <span class="app-name">/home/user/area de trabalho</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Raiz</span>'
      + '       <span class="app-name">/</span>'
      + '     </div>'
     + '   </li>' 
     + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-trash.svg"/> '
     + '     <div>'
     + '       <span class="app-description">Lixo</span>'
     + '       <span class="app-name">trash:/</span>'
     + '     </div>'
    + '   </li>'      
      + '</ul>'

      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Remoto</span>'

      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-network.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Rede</span>'
      + '       <span class="app-name">remote:/</span>'
      + '     </div>'
      + '   </li>'
     
      + '</ul>'
      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Gravados Recentemente</span>'

      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/calendar.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Hoje</span>'
      + '       <span class="app-name">timeline:/hoje</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/calendar.svg"/> '
      + '     <div>'
      + '       <span class="app-description">ontem</span>'
      + '       <span class="app-name">timeline:/ontem</span>'
      + '     </div>'
      + '   </li>'
      + '</ul>'
      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Procurar Por</span>'

      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-documents.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Documentos</span>'
      + '       <span class="app-name">search:/documents</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-image.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Imagens</span>'
      + '       <span class="app-name">search:/images</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-music.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Audios</span>'
      + '       <span class="app-name">search:/audio</span>'
      + '     </div>'
     + '   </li>' 
     + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-video.svg"/> '
     + '     <div>'
     + '       <span class="app-description">Videos</span>'
     + '       <span class="app-name">search:/videos</span>'
     + '     </div>'
    + '   </li>' 

     + '</ul>'

      + ''
      + ''
      + '</div>'
      
      ,

      history_html: String()
      + '<div class="moyene-shell-launcher-tabview-history">'
      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Aplicações</span>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/konsole.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Terminal</span>'
      + '       <span class="app-name">konsole</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/ms-word.svg"/> '
      + '     <div>'
      + '       <span class="app-description">ms-word</span>'
      + '       <span class="app-name">editor de documentos</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/app/telegram.svg"/> '
      + '     <div>'
      + '       <span class="app-description">telegram</span>'
      + '       <span class="app-name">rede social</span>'
      + '     </div>'
      + '   </li>'
    
      + '</ul>'
      + ' <ul class="moyene-list-group list-group-">'
      + ' <span class="text-white">Documentos</span>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-txt.svg"/> '
      + '     <div>'
      + '       <span class="app-description">descricao</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-txt.svg"/> '
      + '     <div>'
      + '       <span class="app-description">descricao</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-txt.svg"/> '
      + '     <div>'
      + '       <span class="app-description">descricao</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-txt.svg"/> '
      + '     <div>'
      + '       <span class="app-description">descricao</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/home/folder-txt.svg"/> '
      + '     <div>'
      + '       <span class="app-description">descricao</span>'
      + '     </div>'
      + '   </li>'
      + '</ul>'

      + ''
      + ''
      + ''
      + '</div>'
      
      ,

      leave_html: String()
      + '<div class="moyene-shell-launcher-tabview-leave">'
      + ' <span class="text-white">Sessao</span>'
      + ' <ul class="moyene-list-group list-group-">'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/session/lock.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Trancar</span>'
      + '       <span class="app-name">Trancar sessao</span>'
      + '     </div>'
      + '   </li>'
      + '   <li class="moyene-list-group-item"> <img src="/assets/desktopIcon/launcher/session/logout.svg"/> '
      + '     <div>'
      + '       <span class="app-description">Sair</span>'
      + '       <span class="app-name">Fechar aplicacao</span>'
      + '     </div>'
      + '   </li>'
    
      + '</ul>'
      + ''
      + '</div>'
      
      ,
      main_html : String()
      + ' <div class="moyene-shell-launcher-container moyene-glass">'
      + '   <div class="moyene-shell-launcher-header">'
      + '     <a class="profile">'
      + '       <img class="launcher-user-img" src="/assets/themify-icons/SVG/user.svg" alt="">'
      // + '           <i class="ti-user"></i>'

      + '     </a>'
      + '     <div class="form-search"> '
      + '       <label class="launcher-user" for="search">Guest</label>'
      + '       <input class="moyene-shell-launcher-search" type="text" placeholder="procurar...">'
      + '     </div>'
      + '     <span class="hl"></span>'
      + '   </div>'
      + '   <div class="moyene-shell-launcher-body moyene-scrollbar">'
      + '   </div>'
      + '   <div class="moyene-shell-launcher-footer">'
      + '     <span class="hl"></span>'
      + '     <div class="moyene-shell-launcher-tabSelector">'
      + '       <div class="moyene-shell-launcher-tab favorite">'
      + '         <div class="tab-icon">'
      + '           <i class="lni-bookmark"></i>'
      + '         </div>'
      + '       <div class="tab-name ellipsis">Favorito</div>'
      + '       <div class="launch-tab-active"></div>'
      + '     </div>'
      + '       <div class="moyene-shell-launcher-tab application">'
      + '         <div class="tab-icon">'
      + '           <i class="lni-grid-alt"></i>'
      + '         </div>'
      + '       <div class="tab-name ellipsis">Aplicacoes</div>'
      + '       </div>'
      + '       <div class="moyene-shell-launcher-tab home">'
      + '       <div class="tab-icon">'
      + '         <i class="lni-home"></i>'
      + '       </div>'
      + '       <div class="tab-name ellipsis">Moyene</div>'
      + '       </div>'
      + '       <div class="moyene-shell-launcher-tab history">'
      + '         <div class="tab-icon">'
      + '           <i class="ti-time"></i>'
      + '         </div>'
      + '         <div class="tab-name ellipsis">Historico</div>'
      + '       </div>'
      + '       <div class="moyene-shell-launcher-tab exit">'
      + '         <div class="tab-icon">'
      + '           <i class="lni-exit"></i>'
      + '         </div>'
      + '         <div class="tab-name ellipsis">Sessão</div>'
      + '       </div>'
      + '     </div>'
      + '   </div>'
      + '</div>'
 



    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, toggle, onLaunchtabHover, open, close;
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
      $input_search : $container.find( 'input.moyene-shell-launcher-search '),
      $launch_body  : $container.find('.moyene-shell-launcher-body'),
      $launch_label_user : $container.find('.launcher-user'),
      $tabicons : $container.find('.moyene-shell-launcher-tab')

    };
  };  

  // fim metodo DOM  /setJqueryMap/

  
  // Inicio metodo publico  /showLauncher/
  // Proposito : alternar entre abrir ou fechar o menu
  // Argumento : 
  //  * event  : objecto evento
  //  *
  // Definicoes :
  //  * 
  // Retorno : 
  // Excecao : 
  //
  //#TODO: toggle ==>  showLauncher
  toggle = function() {
    $container = jqueryMap.$container;
    if ( $container.is(":visible") ) {
      $container.hide();
    } else {
      $container.show();
      jqueryMap.$launch_body.html(configMap.favorite_html);
      jqueryMap.$input_search.focus();
    }
  }
  // fim metodo publico  /showLauncher/

  //  inicio metodo publico  /open/
  open = function() {
    var $container;
    
    $container = jqueryMap.$container;
    $container.show();
    jqueryMap.$input_search.focus();
  }  
  //  fim metodo publico  /open/

  
  //  inicio metodo publico  /open/
  close = function() {
    var $container;
    
    $container = jqueryMap.$container;
    $container.hide();
  }  
  //  fim metodo publico  /open/



  // // inicio metodo publico  /showLauncher/
  // show_aplication_category = function () { 
    
  //  }
  // fim metodo publico  /showLauncher/


  //---------------------- FIM METODO DOM ---------------------

  //------------------- INICIO MANIPULADOR EVENTO -------------------
// Inicio /onLaunchtabHover/
// Proposito :  
// Argumento : event - objecto evento DOM
// Definicoes : nenhuma
//  * 
// Retorno :  false - fim evento
// Excecao : nenhum
//
onLaunchtabHover = function( event ) {
  var $tab_active, $tab_hover, $app;

  $tab_active = jqueryMap.$tabicons.find('.launch-tab-active');
  $tab_hover = $(this).find('.launch-tab-active');

  if ( !$tab_hover.length ) {
    $(this).append($tab_active);

    if ($(this).hasClass('favorite')) {
      jqueryMap.$launch_body.html($(configMap.favorite_html).hide());
      $app = jqueryMap.$launch_body.find('.moyene-shell-launcher-tabview-favorite');
      $app.show('fast'); 
      
    } else
    if ($(this).hasClass('application')) {
      jqueryMap.$launch_body.html($(configMap.application_html).hide());
      $app = jqueryMap.$launch_body.find('.moyene-shell-launcher-tabview-application');
      $list = $app.find('.moyene-list-group-item');
      $list.append($(configMap.application_container_html).hide())
      $app.find('.moyene-list-group-item').on('click', event => {
        var $target = $(event.currentTarget);
        $target.find('ul').toggle();
        $target.hasClass('app-category-active') === true ? 
        $target.removeClass('app-category-active') :
        $target.addClass('app-category-active') ;
      });
      
      $app.show('fast'); 
    } else
    if ($(this).hasClass('home')) {
      jqueryMap.$launch_body.html($(configMap.home_html).hide());
      $app = jqueryMap.$launch_body.find('.moyene-shell-launcher-tabview-home');
      $app.show('fast'); 

    } else
    if ($(this).hasClass('history')) {
      jqueryMap.$launch_body.html($(configMap.history_html).hide());
      $app = jqueryMap.$launch_body.find('.moyene-shell-launcher-tabview-history');
      $app.show('fast'); 

    } else
    if ($(this).hasClass('exit')) {
      jqueryMap.$launch_body.html($(configMap.leave_html).hide());
      $app = jqueryMap.$launch_body.find('.moyene-shell-launcher-tabview-leave');
      $app.show('fast'); 

    } 


  }

  return false;
}
// Fim /onLaunchtabHover/

// inicio /onLogin/
onLogin = function() {
  $.gevent.subscribe(jqueryMap.$container, 'moyene-login', function (event, user ) {
    jqueryMap.$launch_label_user.text(user.name)  
  });


}
// fim /onLogin/

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
    jqueryMap.$container.hide();

    // publicar e subscrever eventos ao launcher
    onLogin();
    jqueryMap.$tabicons.hover(onLaunchtabHover);

    // jqueryMap.$container.menu.bind('utap', _onTapToggle)

    return true;
  };
  // fim metodo publico /inicModulo/

  // retornar metodos publicos
  return {
    toggle  : toggle,
    open    : open,
    close   : close,
    configModule  : configModule,
    initModule    : initModule
  };
  //-------------------  FIM METODOS PUBLICOS ---------------------
}());