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
        + `
        <div class="card moyene-shell-signup-card">
        
        <div class="card-img-top" >
        </div>
        <div class="card-body bgCardDescLogin " style="margin-bottom: 55px;" >
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <p>Entrar para continuar</p>
                <form id="form-login" class="inline-block"  action="" method="get">
                  <div class="form-group">
                    <input type="text" class="form-control" name="email_number" id="email_number" aria-describedby="email_numeroHelp" placeholder="email ou numero">
                  </div>
      
  
                  <div class="input-group mb-3">
                    <input type="password" class="form-control" name="senha" placeholder="senha" aria-label="senha" aria-describedby="senha">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" name="login" type="submit" id="login">Entrar</button>
                    </div>
                  </div>
                  <div class="form-group form-check">
                    <input type="checkbox" name="https" class="form-check-input" id="https">
                    <label class="form-check-label" for="https">Connectar via HTTPS</label>
                  </div>
                  <div class="form-group form-check">
                    <input type="checkbox" name="remember" class="form-check-input" id="remember">
                    <label class="form-check-label" for="remember">Lembrar Sessao. <a href="#">Recuperar  senha!</a></label>
                  </div>
                </form>
              </div>
              <div class="col-sm ">
                <div class="d-flex justify-content-center">
                  <p>Escanear Codigo QR</p>
                </div>
  
                <div class="d-flex justify-content-center">
                  <img src="assets/images/qr.png" style="width: 125px;">                
                </div>
  
                <div class="d-flex justify-content-center">
                   <a href="#">Refrescar</a>
                </div>
                <div class="d-flex justify-content-end">
                  <p></p>
  
                </div>
                <hr>
  
                <div class="d-flex align-items-end flex-column bd-highlight mb-3">
                 
                  <div class="mt-auto p-2 bd-highlight">  <a href="#">Criar uma conta</a></div>
                </div>
              </div>
          
            </div>
          </div>
  
        </div>
      </div>
        
        `
        
 
  
      },
      stateMap = {
        $container: null
      },
      jqueryMap = {},
      setJqueryMap, configModule, initModule, _openWindow, _closeWindow, _onLogin, _login;
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
        $form : $container.find('form#form-login'),
        $btnSubmit : $container.find('#login')
      };
    };
    // fim metodo DOM  /setJqueryMap/
  

    _login = function(usuario, senha) {
      // #TODO: verificacao  das credenciais
      moyene.model.users.login(usuario);
      _closeWindow();
      
    }

  // inicio metodo DOM  /_openWindow/
  _openWindow  = function(param=[{titulo: "teste", aplicacao: "mensagem", container : configMap.main_html}]) {
    $.gevent.publish(
      'moyene-create-window',
      param
    );
  }
  
  // fim metodo DOM  /_openWindow/

  
  // inicio metodo DOM  /_closeWindow/
  _closeWindow  = function() {
    $.gevent.publish(
      'moyene-close-window',
      []
    );
  }
  
  // fim metodo DOM  /_closeWindow/
    //---------------------- FIM METODO DOM ---------------------

  
    //------------------- INICIO MANIPULADOR EVENTO -------------------
    // example: onClickButton = ...
    _onLogin = function() {
      var form, user, password;
      
      $('form#form-login').on("submit", function() {
        // #TODO: check form input

        form = $(this).serializeArray();
        user = form.email_numero;
        password = form.senha;

        _login(user, password);

        return false;
      });
    }
    
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
      moyene.shell.windows.configModule( {} );
      moyene.shell.windows.initModule($container );
      setJqueryMap();
      _openWindow();
      // _onLogin();

      $('form#form-login').on("submit",  function(event)   {
        event.preventDefault();
        console.log($(this).serializeArray());
        var form = $(this).serializeArray();
         _login(form[0].value, form[1].value);
        _closeWindow();
        // return false;
        });

      

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