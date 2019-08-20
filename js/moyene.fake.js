
/*
* moyene.fake.js
* Modulo rensponsavel pela simulacao de um servidor, Para testes.
*/


/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.fake = (function () {
  'use strict'
  //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
  var getUserList, fakeIdSerial, makeFakeId, mockSio, userList, emit_mock_msg, notificationList, messageList, callList, instanceStorageList;
    

  fakeIdSerial = 5;

  makeFakeId = function () {
    return 'id_' + String(fakeIdSerial++);
  }
  //----------------- FIM MODULO ESCOPO VARIAVEL ---------------  



  //------------------- INICIO METODOS PUBLICOS -------------------


  
  userList = [
      { name: 'Dercio', _id: 'id_01' },
      { name: 'Leo', _id: 'id_02' },
      { name: 'Bernardo', _id: 'id_03' },
      { name: 'Casquinho', _id: 'id_04' },
  ];

  notificationList = [
    {
    source  : 'system',
    title   : 'conexao',
    message : 'Casquinho aceitou sua conexao!',
    type    : 'alert',          
  },
  {
    source  : 'system',
    title   : 'login ',
    message : 'Entrou usando outro dispositivo!',
    type    : 'alert',          
  },
  {
    source  : 'app',
    title   : 'alarme',
    message : 'Faltam 5 minutos para tarefa x!',
    type    : 'alert',          
  },
  {
    source  : 'system',
    title   : 'Conexao',
    message : 'Bernardo enviou um pedido de amizade!',
    type    : 'alert',          
  },
  {
    source  : 'system',
    title   : 'Sistema',
    message : 'O teu disco esta quase cheiro!',
    type    : 'alert',          
  },

];




messageList = [
  {
  source  : 'system',
  title   : 'Bernardo',
  message : 'Que tal sairmos para almocar!',
  type    : 'message',          
},
{
  source  : 'system',
  title   : 'Leo ',
  message : 'Vamos a terramar!',
  type    : 'message',          
},
{
  source  : 'system',
  title   : 'Paulo',
  message : 'Envie o programa',
  type    : 'message',          
},
{
  source  : 'system',
  title   : 'Jorge Rodrigues',
  message : 'Ja esta pronto o sistema!',
  type    : 'message',          
},
{
  source  : 'system',
  title   : 'Leo',
  message : 'Ja tenho as fotos!',
  type    : 'message',          
},

];



callList = [
  {
  source  : 'system',
  title   : 'Casquinho',
  message : 'Video!',
  type    : 'call',       
  call : {
    type:  'incoming',
    message: {
      pt:  'Recebida',
      en: 'incoming'
    }
  } },
{
  source  : 'system',
  title   : 'Jorge Rodrigues ',
  message : 'Video Conferencia!',
  type    : 'call',          
  call : {
    type:  'outgoing',
    message: {
      pt:  'Efectuada',
      en: 'Outgoing'
    }
  } 
},
{
  source  : 'system',
  title   : 'Bernardo',
  message : 'Audio',
  type    : 'call',          
  call : {
    type:  'incoming',
    message: {
      pt:  'Recebida',
      en: 'Incoming'
    }
  }   
},
{
  source  : 'system',
  title   : 'Paulo',
  message : 'Video',
  type    : 'call',
  call : {
    type:  'missed',
    message: {
      pt:  'Nao atendida',
      en: 'Missed'
    }
  }   },
{
  source  : 'system',
  title   : 'Leo',
  message : 'Audio',
  type    : 'call',          
  call : {
    type:  'outgoing',
    message: {
      pt:  'Efectuada',
      en: 'outgoing'
    }
  }   

},

];


instanceStorageList = [
  {
    id: 1,
    nome: 'instancia 1',
    total: 20350672896,
    used: 1024 

  }

]

  mockSio = (function () {
    var on_sio, emit_sio, send_listchange, listchange_idto,
     callback_map = {};

    on_sio = function ( msg_type, callback ) {
      callback_map[ msg_type ] = callback;
      console.log(callback_map);
    }
    emit_sio = function( msg_type, data ) {
      var user_map;
      
      // reponder ao evento 'adduser' com
      //  callback 'userupdate' depois de 3s de demora
      if ( msg_type === 'adduser' && callback_map.userupdate ) {
        setTimeout(() => {
          // callback_map.userupdate(
          //   [{ _id :  makeFakeId(),
          //     name :  data.name,              
          //   }]
          // );
          user_map = {
            _id     : makeFakeId(),
            name    : data.name,
          };
          userList.push( user_map );
          callback_map.userupdate([ user_map ])
        }, 3000);
      }

    // responder ao evento 'updatechat' com
    // callback depois de 2s de atraso. 
    // Ecoar de volta info do usuario
    if ( msg_type === 'updatechat' && callback_map.updatechat ) {
      setTimeout(() => {
          var user = moyene.model.users.get_user();
          callback_map.updatechat([{
            dest_id   : user.id,
            dest_name : user.name,
            sender_id : data.dest_id,
            msg_text  : 'Obrigado pela nota, ' + user.name
          }]);
      }, 2000);
    }

    if ( msg_type === 'updatenotification' && callback_map.updatenotification ) {
      setTimeout(() => {
        var notification = {
          source  : 'system',
          title   : 'actualizacao',
          message : 'actualizacao terminou com sucesso!',
          type    : 'alert',          
        }
        notificationList.push(notification);
        callback_map.updatenotification([notificationList]);
      }, 5000);

      setTimeout(() => {      
        callback_map.updatenotification([messageList]);
      }, 3000);
      setTimeout(() => {      
        callback_map.updatenotification([callList]);
      }, 7000);
    }
    if ( msg_type === 'leavechat' ) {
      // restaurar estado de login
      delete callback_map.listchange;
      delete callback_map.updatechat;

      if ( listchange_idto ) {
        clearTimeout( listchange_idto );
        listchange_idto = undefined;
      }
      send_listchange();
    }

    console.log("map",callback_map);
    if ( msg_type === 'updateDatastorage' && callback_map.updateDatastorage ) {
      console.log("map1",callback_map);
      setTimeout(() => {      
        callback_map.updateDatastorage([instanceStorageList]);
      }, 3000);
    }







  };

    emit_mock_msg = function () { 
      setTimeout(() => {
        var user = moyene.model.users.get_user();
        if ( callback_map.updatechat ) {
          callback_map.updatechat([{
            dest_id   : user.id,
            dest_name : user.name,
            sender_id : 'id_04',
            msg_text  : 'Alo ai ' + user.name + '! casquinho aqui'
          }]);
        } 
        else { emit_mock_msg(); }
      }, 8000);
    };

    send_listchange = function () { 
        listchange_idto = setTimeout( function() {
          if ( callback_map.listchange ) {
            callback_map.listchange([ userList ]);
            emit_mock_msg();
            listchange_idto = undefined;
          } 
          else { send_listchange(); }
        }, 1000);
       };

       // iniciar o processo
       send_listchange();

    return { emit : emit_sio, on: on_sio };
  }());
  //-------------------  FIM METODOS PUBLICOS ---------------------


  return {
    mockSio     : mockSio
  };

}());