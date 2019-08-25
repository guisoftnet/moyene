
 /*
 * moyene.model.js
 * Modulo rensponsavel pelos modelos usado no sistema
 */

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global TAFFY, $,   moyene */
moyene.model = (function () {
    //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var 
      configMap = { anon_id: 'a0'},
      stateMap = {
          anon_user : null,
          cid_serial: 0,
          user_cid_map : {}, 
          user_db   : TAFFY(), 
          user : null,
          is_connected  : false 
      },
      // alterar para false quando estiver em producao
      isFakeData = true,
      userProto, makeCid, clearUserDb, completeLogin, chat,
       makeUser, removeUser, users, initModule;
  //----------------- FIM MODULO ESCOPO VARIAVEL ---------------
  

  userProto =  {  
      get_is_user : function () { 
          return this.cid === stateMap.user.cid;
        },
      get_is_anon: function () { 
          console.log(stateMap)
           return this.cid === stateMap.anon_user.cid;
        }
  }   


  // inicio /makecid/
  makeCid = function () {
    return 'c' + String( stateMap.cid_serial++ );
  };
  // fim /makecid/


  // inicio /clearUserDb/
  // 
  clearUserDb = function() {
    var user = stateMap.user;
    stateMap.user_db = TAFFY();
    stateMap.user_cid_map = {};
    if ( user ) {
      stateMap.user_db.insert( user );
      stateMap.user_cid_map[ user.cid ] = user;
    }
  };
  // fim /clearUserDb/

  // inicio /completeLogin/
  // 
  completeLogin = function ( user_list ) {
    // se ja estiver logado retornar
    // if ( users.get_user().get_is_anon() === false ) { return false }

    var user_map = user_list[ 0 ];
    delete stateMap.user_cid_map[ user_map.cid ];
    stateMap.user.cid = user_map._id;
    stateMap.user.id = user_map._id;
    stateMap.user_cid_map[ user_map._id ] = stateMap.user;
    chat.join();
    notification.get_notification();
    notification.send_notification("system", "login", "usuario " + stateMap.user.name + " logado", "alert");
    storage.fetch_disk_space();
    storage.askfor_disk_space();

    // Aqui onde vamos processar e sincronizar todos dados e informacoes  
    // do usuario que acabou de logar
    // 
    $.gevent.publish('moyene-login', [ stateMap.user ]);
  };
  // fim /completeLogin/


  // inicio /makeUser/
  // 
  makeUser = function( user_map ) {
    var user,
    cid = user_map.cid,
    id  = user_map.id,
    name = user_map.name;

    if ( cid ===  undefined || ! name ) {
      throw 'Necessario ID e Nome de usuario '
    }

    user = Object.create( userProto );
    user.cid = cid;
    user.name = name;

    if ( id ) { user.id = id; }

    stateMap.user_cid_map[cid] = user;

    stateMap.user_db.insert(user);

    return user;
  };

  // fim /makeUser/


  // inicio /removeUser/
  removeUser = function(user) {

    if ( ! user ) { return false; }
    // usuario anonino nao pode ser removido
    if ( user.id === configMap.anon_id ) {  return false; }

    stateMap.user_db({ cid: user.cid }).remove();
    if ( user.cid ) {
      delete stateMap.user_cid_map[ user.cid ];
      if ( user.cid ) {
        delete stateMap.user_cid_map[ user.cid ];
      }

      return true;
    };


  }
  // inicio /removeUser/
  
  
  
  // inicio /users/
  
  // The user object API
  //-----------------------
  // Objecto user esta disponivel em moyene.model.users.
  // Objeto 'user' fornece metodos e eventos para gerir 
  // colecao de usuarios. Metodos publicos inclui:
  //    * get_user() - retorna objecto do usuario corrente.
  //        se o usuario nao tiver logado, um objecto anonimo 
  //        eh retornado.
  //    * get_db() - retorna base de dados TAFFYDB com todos 
  //        com todos usuarios objectos incluindo 
  //        o usuario corrente - preOrdenado.
  //    * get_by_cid( <contact_id> ) - retorna objecto usuario
  //        com id unico fornecido.
  //    * login( <user_name> , <password> ) - logar como usuario 
  //        cadastrado com username e senha fornecido.
  //          O objecto usuario corrente eh alterado para refletir
  //        a nova identidade. Depois de login com successo publicar
  //        um evento personalido global 'moyene-login'
  //    * logout() - reverter o objecto usuario para anonino.
  //        Este metodo publica o evento global 'moyene-logout'
  // 
  // Jquery Eventos global publicado pelo objecto inclui:
  //    * moyene-login -  Este eh publicado depois que o usuario completa 
  //        o processo de login. O objecto usuario actualizado 
  //        eh fornecido como argumento.
  //    * moyene-logout - Este eh publicado depois que logout completa.
  //      O antigo objeto de usuário é fornecido como dado.
  // 
  // Cada usuario eh representado pelo objecto 'user'.
  // objecto user fornece seguintes metodos:
  //    * get_is_user() - retorna true se objecto eh usuario corrente.
  //    * get_is_anon() - retorna true se objecto for anonimo.
  // 
  // Atributos para objecto 'user' inclui :
  //    * cid   : string client id: este eh sempre definido, e 
  //       so eh diferente do atributo 'id' se os dados nao 
  //        estiverem sincronizados com o backend.
  //    * id        : id unico. pode estar nulo se o objecto
  //        nao estiver sincronizado com o backend.
  //    * name      : nome do usuario.
  //    * password  : senha do usuario.
  //    * 
  //
  users = (function() {
    var get_by_cid, get_db, get_user, login, logout;

    get_by_cid = function ( cid )  { 
      return stateMap.user_cid_map[ cid ];
    };
    get_db = function () { return stateMap.user_db; };

    get_user = function () { return stateMap.user; }

    login = function ( name ) {
      // if ( get_user().get_is_anon() === false ) { return false; }
      var sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();

      stateMap.user = makeUser({
        cid : makeCid, 
        name  : name
      });

      sio.on( 'userupdate', completeLogin );
      sio.emit( 'adduser', {
        cid   :   stateMap.user.cid,
        name  :   stateMap.user.name
      });
    };


    logout = function () { 
      var 
        user = stateMap.user, 
        is_removed;

      // Terminar todos processo do usuario

      is_removed  = removeUser( user );
      stateMap.user = stateMap.anon_user;

      $.gevent.publish( 'moyene-logout' , [ user ] );

      return is_removed;
     };

     return {
       get_by_cid : get_by_cid, 
       get_db     : get_db,
       get_user   : get_user,
       login      : login,
       logout     : logout,
     };

  }());
  // fim /users/

  
  // The chat object API
  //-----------------------
  // Objecto chat esta disponivel em moyene.modelchat.
  // Objecto chat fornece metodos e eventos para gerir mensagem \
  // de chats. Seus metodos publico incluem:
  //    * join() - Entrar em grupo. Esta rotina configura o 
  //  o protocolo de chat com o backend incluindo handlers publicados
  //  para os eventos  globais personalizados 'moyene-listchange' e 'moyene-updatechat' 
  //  se o usuario actual for anonimo.  Limpar sessao e trancar todos processos.
  //    * get_chatee - retornar o objecto usuario com quem o usuario esta conversando. 
  //    Se nao tiver nenhum usuario, nulo sera retornado.
  //    * set_chatee ( <user_id> ) - selecionar usuario com quem conversar idenficado pelo user_id.
  //  Se o user_id nao existir na lista de usuario, o chatee eh definido  como null, se o
  // usuario solicitado ja eh o chatee, retornar false.
  // publicar um evento personalizado 'moyene-setchatee'
  //     * send_msg( <msg_texto> ) - enviar mensagem ao chatee.
  //  publicar evento 'moyene-updatechat'.
  //  Se o usuario for anonimo ou o chatee for nulo. Abortar e retornar false.
  //
  // Eventos personalizados global publicado pelo objecto chat inclui:
  //      * moyene-setchatee - eh publicado quando novo chatee eh selecionado. mapa :
  //              { antigo_chatee : <antigo_chatee_usuario_objecto> ,
  //                novo_chatee   : <novo_chatee_usuario_objecto>  
  //              }
  //        eh fornecido como data.
  //      * moyene-listchange - este eh publicado quando a lista de usuarios online altera 
  //      o tamanho (Ex: quando o usuarios entram ou saem do chat) ou quando seu conteduo altera
  //        (Ex: Quando os detalhes do avatar alteram).
  //      * moyene-updatechat  - este eh publicado quando nova mensagem eh recebida ou enviada. Forma do mapa:
  //      { dest_id : <chatee_id,
  //        dest_name  : <chatee_name>,
  //        sender_id  : <sender_id>,
  //        msg_text   : <message_content>
  //      }
  //  mapa msg_map eh fornecido como dado.

  chat = (function() {
    var
      _publish_listchange,
      _update_list, _leave_chat, join_chat,
      get_chatee, send_msg, set_chatee, chatee = null;

      // Inicio metodos internos
    _update_list = function ( arg_list ) { 
      var i , user_map, make_user_map,
          user_list = arg_list[ 0 ],
          is_chatee_online = false;
      clearUserDb();

      USER: 
      for ( i = 0; i < user_list.length; i++) {
        user_map =  user_list[ i ];

        if ( ! user_map.name ) { continue USER; }
            
        make_user_map = {
          cid     : user_map._id,
          id      : user_map._id,
          name    : user_map.name
        };
        if ( chatee && chatee.id === make_user_map.id ) {
          is_chatee_online = true;
        }
        makeUser( make_user_map );
      }
        stateMap.user_db.sort( 'name' );
        
        // se o chatee ja nao estiver mais online
        // redefinir o chatee
        // que ira disparar o evento global 'moyene-setchatee'
        if ( chatee && is_chatee_online ) { set_chatee(''); }
    };

    _publish_listchange = function ( arg_list )  { 
      _update_list ( arg_list );
      $.gevent.publish( 'moyene-listchange', [ arg_list ] );
    };

    _publish_updatechat = function ( arg_list ) {
      var msg_map = arg_list[ 0 ];

      if ( ! chatee ) { set_chatee ( msg_map.sender_id ); }
      else if ( msg_map.sender_id !== stateMap.user.id
        && msg_map.sender_id !== chatee.id
      ) { set_chatee( msg_map.sender_id ); }

      $.gevent.publish( 'moyene-updatechat', [ msg_map ]);
    };

    _leave_chat = function () { 
      var sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();
      chatee = null;
      stateMap.is_connected = false;
      if ( sio ) { sio.emit( 'leavechat' ); }        
    };
    get_chatee = function () { return chatee; };
    join_chat = function () {
      var sio;

      if ( stateMap.is_connected ) { return false; }

      if ( stateMap.user.get_is_anon() ) {
        console.warn( 'Usuario deve estar registado antes de entrar no chat');
        return false;
      }

      sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();
      sio.on( 'listchange', _publish_listchange );
      sio.on( 'updatechat', _publish_updatechat );
      stateMap.is_connected = true;

      return true;
    };

    send_msg = function( msg_text ) {
      var msg_map,
        sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();

        if ( ! sio ) { return false; }
        if ( ! ( stateMap.user && chatee ) ) { return false; }
        msg_map = {
          dest_id     : chatee.id,
          dest_name   : chatee.name,
          sender_id   : stateMap.user.id,
          msg_text    : msg_text
        };

        // publicar evento updatechat para que possamos mostrar nossas mensagens enviadas
        _publish_updatechat( [ msg_map ] );
        sio.emit( 'updatechat', msg_map );
        return true;
    };

    set_chatee = function ( user_id ) {
      var new_chatee;
      new_chatee = stateMap.user_cid_map[ user_id ];
      if ( new_chatee ) {
        if ( chatee && chatee.id === new_chatee.id ) {
          return false;
        }
      }
      else {
        new_chatee = null;
      }

      $.gevent.publish( 'moyene-setchatee',
        { old_chatee : chatee, new_chatee : new_chatee }
      );

      chatee = new_chatee;
      return true;
    };

    return {
      _leave_chat : _leave_chat,
      join        : join_chat,
      get_chatee  : get_chatee,
      send_msg    : send_msg,
      set_chatee  : set_chatee
    }
  }());




  
  // The notification object API
  //-----------------------
  // Objecto notificacao esta disponivel em moyene.model.notification.
  // Objecto notificacao fornece metodos e eventos para gerir notificacao \
  // do sistema. Seus metodos publico incluem:
  //      *send_msg (<source>, <title>, <message>, <type> ) - enviar notificacao (sobre alguma actividade) 
  //    ao usuario logado.
  //    Publicar o evento 'moyene-updatenotification'
  //  Eventos personalizados publicados pelo objecto notificacao inclui:
  //    * moyene-updatenotification - este eh publicado quando um alerta eh recebido. Formato do mapa
  //      {
  //        notification_map = {
  //        source  : <source>,
  //        title   : <title>,
  //        message : <message>,
  //        type    : <type>,        
  //        timestamp : <date.getTime()>
  //      }
  //  mapa 'notifiation_map'  fornecido como dado

  notification = (function(){
    var _publish_updatenotification, notification_map,
      sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();

    ;


    get_notification = function () { 
      sio.on('updatenotification', _publish_updatenotification)
     }


    send_notification = function(source, title, message, type) {
      var notifiation_map,
        sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();
        _timestamp = new Date();
      if ( ! sio ) { return false; }
      if ( ! stateMap.user ) { return false; }


      notification_map = {
        source  : source,
        title   : title,
        message : message,
        type    : type,        
        timestamp : _timestamp.getTime()
      }

      // publicar evento updatenotification 
      // _systemEvent();
      _publish_updatenotification( [notification_map] );
      sio.emit( 'updatenotification', notification_map );
      return true;

    } 

    _publish_updatenotification = function ( arg_list ) {
      var notification_map = arg_list[ 0 ];
      $.gevent.publish('moyene-updatenotification', [ notification_map ])
    }


    return {
      send_notification : send_notification,
      get_notification  : get_notification
    }
  }());

// The storage object API
  //-----------------------
  // Objecto 'storage' esta disponivel em moyene.model.storage.
  // Objeto 'storage' fornece metodos e eventos para gerir 
  //  armazenamento da instancia . Metodos publicos inclui:
  //    * get_total_space() - retorna espaco total alocado a 
  //            instania ou total do sistema se for dinamico
  //    * get_used_space - retorna espaco em uso pela instancia
  //
  // 
  // Jquery Eventos global publicado pelo objecto inclui:
  //    * moyene-updateDatastorage - evento publicado sempre que houver
  //        alguma alteracao no sistema do ficheiro. Mapa com nova infor-
  //        macao sobre armazenamento eh enviado
 
  storage = (function(){
    var  fetch_disk_space, askfor_disk_space
      , sio = isFakeData ? moyene.fake.mockSio : moyene.data.getSio();
;

    askfor_disk_space = function() {
      sio.emit( 'updateDatastorage' );    
      return true;  
    }
    

    fetch_disk_space = function () { 
      sio.on('updateDatastorage', _publish_disk_space)
     }

    _publish_disk_space = function(arg_list) {
      var diskspace_map = arg_list[ 0 ];
      $.gevent.publish('moyene-updateDatastorage', [ diskspace_map ]);
    }
    return {
      fetch_disk_space : fetch_disk_space,
      askfor_disk_space : askfor_disk_space
    } ;
  }())


  //------------------- INICIO METODOS PUBLICOS -------------------
        
    // Inicio metodo publico /initModule  
    // Proposito : 
    // Argumento :
    // * 
    // Retorno : 
    // Excecao : 
    //
  initModule = function ($container) {
    var i, user_list, user_map; 

    // inicializar usuario anonimo
    stateMap.anon_user = makeUser({
      cid : configMap.anon_id, 
      id  : configMap.anon_id,
      name: 'anonimo'
    });

    stateMap.user = stateMap.anon_user;

    // if ( isFakeData ) {
    //   user_list = moyene.fake.getUserList();
    //   for ( i = 0; i < user_list.length; i++ ) {
    //     user_map = user_list[ i ];
    //     makeUser({
    //       cid   : user_map._id,
    //       id    : user_map._id,
    //       name  : user_map.name
    //     });
    //   }
    // }
  };
    // fim metodo publico /inicModulo/
  
    // retornar metodos publicos
    return {
      initModule: initModule,
      chat      : chat,
      users     : users,
      notification : notification,
      storage   : storage,
    };


    //-------------------  FIM METODOS PUBLICOS ---------------------
  }());