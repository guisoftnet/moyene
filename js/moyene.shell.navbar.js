/*
 * moyene.shell.navbar.js
 * Modulo responsavel pelo navbar 
 */
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.navbar = (function () {
    //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
    var
    
      configMap = {
        logout_html : String() 
        + '<div id="myNav" class="overlay">'        
        + '   <a href="javascript:void(0)" id="closeview" class="closebtn" >&times;</a>'
        + '   <div class="overlay-content">'
        + '       <div class="w-100 logout-user">'
        + '         <span id="avatar-user" class="fa fa-user "></span>'
        + '         <p>dercio guirruta</p>'
        + '       </div>'
        + '       <div class="w-100 logout-option">'
        + '       <a href="javascript:void(0)" class="logout-action">'
        + '         <span class="lni-timer"></span>'
        + '         <p class="">Suspender</p>'
        + '       </a>'
        + '       <a href="javascript:void(0)" class="logout-action">'
        + '         <span class="ti-reload"></span>'
        + '         <p class="">Reiniciar</p>'
        + '       </a>'
        + '       <a href="javascript:void(0)" class="logout-action">'
        + '         <span class="ti-lock"></span>'
        + '         <p class="">Trancar Sessao</p>'
        + '       </a>'
        + '       <a href="javascript:void(0)" class="logout-action">'
        + '         <span class="ti-arrow-circle-left"></span>'
        + '         <p class="">Sair Sessao</p>'
        + '       </a>'
        + '    </div>'
        + '    <a href="javascript:void(0)" id="logout-confirm" class="btn btn-secondary btn-sm">OK</a>'
        + '    <a href="javascript:void(0)" id="logout-cancel"  class="btn  btn-secondary btn-sm" >Cancelar</a>'
        + '   </div>'
        + '</div>'

        ,
        main_html : String()
        + '<div class="moyene-shell-nav context-menu-navbar">'
        +   '<div id="moyene_shell-nav_logo">'
        +     '<h3>moyene</h3>'
        +   '</div>'
        +   '<div id="moyene_shell_nav_search">'
        +     '<input type="text" placeholder="pesquise aqui">'
        +   '</div>'
        +   '<div id="moyene_shell_nav_services">'
        +   '<div  class="dropdown dropdown-message">'
        +     '<a  class="icon" href="javascript:void(0)" role="button" id="dropdownMessage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        +       '<i class="fa fa-envelope"></i>'
        +     '</a>'
        + '   <div class="dropdown-menu" aria-labelledby="dropdownMessage">'
        + '   <div class="moyene-notification-container">'
        + '     <h6 class="dropdown-header text-center">Mensagem</h6>'
        + '   </div>'
        + '     <a href="#" class="moyene-notification-footer dropdown-header  btn btn-block  text-center">Nenhuma mensagem</a>'

        + '   </div>'
        + '   </div>'        
        +   '<div  class="dropdown dropdown-phone">'
        +     '<a   class="icon" href="javascript:void(0)" role="button" id="dropdownPhone" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        +       '<i class="fa fa-phone"></i>'
        +     '</a>'
        + '   <div class="dropdown-menu" aria-labelledby="dropdownPhone">'
        + '   <div class="moyene-notification-container">'

        + '     <h6 class="dropdown-header text-center">Chamadas</h6>'   
        + '   </div>'
        + '     <a href="#" class="moyene-notification-footer dropdown-header  btn btn-block  text-center">Nenhuma chamada</a>'
        + '   </div>'
        + '   </div>'        
        +   '<div  class="dropdown dropdown-notification">'
        +     '<a   class="icon " href="javascript:void(0)" role="button" id="dropdownNotification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        +       '<i class="fa fa-bell"></i>'
        +     '</a>'
        + '   <div class="dropdown-menu" aria-labelledby="dropdownNotification">'
        + '   <div class="moyene-notification-container">'
        + '     <h6 class="dropdown-header text-center">Notificação</h6>'
        + '   </div>'
        + '     <a href="#"  class="moyene-notification-footer dropdown-header  btn btn-block  text-center">Nenhuma notificacao</a>'
        + '   </div>'
        + '   </div>'        
        +   '<div  class="dropdown dropdown-settings">'
        +     '<a   class="icon " href="javascript:void(0)" role="button" id="" data-toggle="" aria-haspopup="true" aria-expanded="false">'
        +       '<i class="fa fa-cog"></i>'
        +     '</a>'
        + '   <div class="dropdown-menu" aria-labelledby="">'
        + '     <h6 class="dropdown-header text-center">Definições</h6>'
        + '     <a class="dropdown-item" href="javascript:void(0)">'
        + '     <p class=""><img src="/assets/themify-icons/SVG/close.svg"/> Ambiente de trabalho</p>'
        +'      </a>'              
        + '    <div class="dropdown-divider w-100"></div>'
        + '     <a class="dropdown-item" href="javascript:void(0)">'
        + '     <p class=""><img src="/assets/themify-icons/SVG/close.svg"/> </i>Sistema</p>'
        +'      </a>'      
        + '    <div class="dropdown-divider w-100"></div>'
        + '   </div>'
        + '   </div>'        
        +     '<a   class="icon " href="javascript:void(0)"  id="navbar-logout" >'
        +       '<i class="fa fa-power-off"></i>'
        +     '</a>'
      
        // + '   </div>'
        // + '   </div>'
        // + '   </div>'        
        +   '</div>'
        + '</div>'
      },
      stateMap = {
        $container: null
      },
      jqueryMap = {},
      setJqueryMap, configModule, initModule, _context_menu, _onClicklogout 
      ,_onClickexitlogoutview, _openLogoutView, _closeLogoutView, _create_notification_item
      ,_create_divider, _push_notification, _onNotification;
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
        ,$logoutBtn: $container.find('#navbar-logout')
        ,$logoutView : $container.find('#mynav')
        ,$logoutView_confirmbtn: $container.find('#logout-confirm')
        ,$logoutView_cancelbtn: $container.find('#logout-cancel')

        ,$notification_message_container: $container.find('.dropdown-message .moyene-notification-container')
        ,$notification_message_footer :  $container.find('.dropdown-message .moyene-notification-footer')

        ,$notification_call_container: $container.find('.dropdown-phone .moyene-notification-container')
        ,$notification_call_footer :  $container.find('.dropdown-phone .moyene-notification-footer')

        ,$notification_container: $container.find('.dropdown-notification .moyene-notification-container')
        ,$notification_footer :  $container.find('.dropdown-notification .moyene-notification-footer')


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
    // jqueryMap.$container.addClass("context-menu-taskbar")
    $.contextMenu({
        selector: '.context-menu-navbar', 
        callback: function(key, options) {
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m); 
        },
        items: {    
            "config": {name: "configurar"},
        }
    });

  
 }
  // fim metodo DOM  /context-menu/


  // inicio /_openLogoutView /
  _openLogoutView = function() {
    document.getElementById("myNav").style.height = "100%";
  }
  // fim /_openLogoutView/ 
  
  // inicio /_closeLogoutView/
  _closeLogoutView = function() {
    document.getElementById("myNav").style.height = "0%";
  }
  // fim /_closeLogoutView/


  
  
    // inicio metodo privado /_create_notification_item/
    // Proposito : criar estrutura de cada notificacao que chegar
    //    
    // Argumento : 
    //  * title - titulo da notificaao
    //  * message - mensagem sobre a acao da notificacao
    //  * time   - descricao em string do tempo passado desde a chegada
    //  da notificaco
    // Definicoes :
    //  * 
    // Retorno : objecto jquery contendo  estrutura de uma notificacao
    // Excecao : nenhuma
    //
  _create_notification_item = function (title, message, time, type='alert') { 
    var $notification_container = $('<a/>')
      ,$notification_icon = $('<i/>')
      ,$notification_text_container = $('<div/>')
      ,$notification_text_title = $('<span/>')
      ,$notification_text_time = $('<span/>')
      ,$notification_text_message = $('<p/>')
      ,$notification_user_avatar = $('<img/>')
      ,$notification_icon_call =  $('<i/>');


    $notification_container.addClass('dropdown-item').attr('javascript:void(0)');
    $notification_icon.addClass('fa fa-sync float-left text-success');
    $notification_text_container.addClass('notification-text w-75 float-left');
    $notification_text_title.addClass('notification-user');
    $notification_text_time.addClass('notification-time float-right');
    $notification_text_message.addClass('notification-body moyene-truncate');    
    
    $notification_user_avatar.attr('src', 'https://via.placeholder.com/50');
    if (type === 'call') {
      $notification_user_avatar.addClass('avatar-small float-left');
      $notification_icon_call.addClass('fa fa-phone-slash float-right text-success');
      $notification_container.append($notification_user_avatar);
      // $notification_text_message.addClass('inline-block')
    } else if (type === 'message') {
      $notification_user_avatar.addClass('avatar float-left');
      $notification_container.append($notification_user_avatar);

    } else {
      $notification_container.append($notification_icon);

    } 

    $notification_container.append($notification_text_container);
    $notification_text_container.append($notification_text_title);
    $notification_text_container.append($notification_text_time);
    $notification_text_container.append($notification_text_message);


    $notification_text_title.text(title);
    $notification_text_message.text(message);
    $notification_text_time.text(time);
    if (type === 'call') {
      $notification_text_message.append($notification_icon_call);
      $notification_text_message.addClass('w-100');
    }

    

    return {map: $notification_container, type: type}
   }
  // fim metodo privado /_create_notification_item/

  // inicio metodo privado /_create_divider/
  _create_divider = function() {
    var $divider = $('<div/>');
    $divider.addClass('dropdown-divider')
    return $divider
  }  
  // fim metodo privado /_create_divider/

  // inicio metodo privado /_push_notification/
  // Proposito : inserir resumo de uma notificacao na navbar
  //    
  // Argumento : 
  //  * $notification - objecto jquery
   // Definicoes : nenhuma
    // Retorno : nenhum
    // Excecao : nenhuma
    //
  _push_notification = function(notification) { 
    var $notification = notification.map
      ,type = notification.type;

    switch (type) {
      case 'alert':        
        jqueryMap.$notification_container.append($notification)
        jqueryMap.$notification_container.append(_create_divider())
        jqueryMap.$notification_footer.text('Ver todas notificacoes');
        break;
        case 'call':        
        jqueryMap.$notification_call_container.append($notification)
        jqueryMap.$notification_call_container.append(_create_divider())
        jqueryMap.$notification_call_footer.text('Ver todas as chamadas');

        break;
        case 'message':        
        jqueryMap.$notification_message_container.append($notification)
        jqueryMap.$notification_message_container.append(_create_divider())
        jqueryMap.$notification_message_footer.text('Ver todas mensagens');

        break;    
      default:
        break;
    }

  }
  // fim metodo privado /_push_notification/

  //---------------------- FIM METODO DOM ---------------------
  
    //------------------- INICIO MANIPULADOR EVENTO -------------------
    //inicio /onClicklogout
    _onClicklogout = function (event) { 
      _openLogoutView();
    }
    //fim /onClicklogout


    //inicio /onClickexitlogoutview
    _onClickexitlogoutview = function (event) { 
      _closeLogoutView();
    }
    //fim /onClickexitlogoutview

    //inicio /_on_notification

    _onNotification = function() {
      var notificanotification_itemtion
      $.gevent.subscribe( jqueryMap.$container, 'moyene-updatenotification', function(event, notification_map ) {
        if ( notification_map ) {
          if (Array.isArray(notification_map)) {
            notification_map.forEach(function (notification) { 
              console.log(notification)
              notification_item =  _create_notification_item(notification.title, notification.message, notification.timestamp, notification.type)
              _push_notification(notification_item)

            })
          } else {
            notification_item =  _create_notification_item(notification_map.title, notification_map.message, notification_map.timestamp, notification.type)
          _push_notification(notification_item)
          }
        }
       });
    }
    //inicio /_on_notification

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
      $container.html(configMap.main_html+configMap.logout_html)
      setJqueryMap();
      // _context_menu();

      // publicar e subscrever eventos
      jqueryMap.$logoutBtn.click(_onClicklogout);      
      jqueryMap.$logoutView_cancelbtn.click(_onClickexitlogoutview)
      _onNotification()

      return true;
    };
    // fim metodo publico /inicModulo/
  
    // retornar metodos publicos
    return {
      configModule: configModule,
      initModule: initModule,
      create_notification: _create_notification_item
    };
    //-------------------  FIM METODOS PUBLICOS ---------------------
  }());