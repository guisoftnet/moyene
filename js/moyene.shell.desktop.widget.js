/*
 * moyene.shell.widget.js
 * Modulo rensponsavel pelos widget( ferramentas ) no destop 
 */

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/* global $, moyene */
moyene.shell.desktop.widget = (function () {
    //---------------- INICIO MODULO ESCOPO VARIAVEL --------------
    var
    
      configMap = {
        main_html : String()
        + '<div class="moyene-shell-widget  moyene-ui-draggable  context-menu-widget">'
        +   '<div class="moyene-shell-widget-content">'
        +       '<div class="moyene-shell-widget-transfer">'
        +           '<div tabindex="0" role="heading" aria-label="ferramenta" class="moyene-shell-widget-transfer-top">'
        +               '<p>Ferramenta</p>'
        +           ' </div>'
        +           '<div class="moyene-shell-widget-transfer-tabSelector moyene-shell-widget-bg">'

        +             '<div class="moyene-shell-widget-transfer-tab moyene-shell-widget-transfer-tab-overview tab-overview active">'
        +               '<div class="moyene-shell-widget-transfer-tab-icon">'
        + '       <img src="/assets/themify-icons/SVG/harddrives.svg" alt="">'
        +               '</div>'
        +               '<div class="moyene-shell-widget-transfer-tab-name ellipsis ">Resumo</div>'
        +             '</div>'

        +             '<div class="moyene-shell-widget-transfer-tab moyene-shell-widget-transfer-tab-uploadfile tab-uploadfile">'
        +               '<div class="moyene-shell-widget-transfer-tab-icon">'
        + '       <img src="/assets/themify-icons/SVG/folder.svg" alt="">'
        +               '</div>'        
        +               ' <div class="moyene-shell-widget-transfer-tab-name ellipsis ">Ficheiro</div>'
        +             '</div>'

        +             '<div class="moyene-shell-widget-transfer-tab moyene-shell-widget-transfer-tab-uploadmidia tab-uploadmidia">'
        +               '<div class="moyene-shell-widget-transfer-tab-icon">'
        + '       <img src="/assets/themify-icons/SVG/video-clapper.svg" alt="">'
        +               '</div>'
        +               '<div class="moyene-shell-widget-transfer-tab-name ellipsis ">Foto / Video</div>'
        +             '</div>'
        +             '<div class="moyene-shell-widget-transfer-tab moyene-shell-widget-transfer-tab-devices tab-devices ">'
        +               '<div class="moyene-shell-widget-transfer-tab-icon">'
        + '       <img src="/assets/themify-icons/SVG/mobile.svg" alt="dispositivos">'
        +             '</div>'
        +               '<div class="moyene-shell-widget-transfer-tab-name ellipsis text-center">Dispositivos</div>'
        +             '</div>'
        +           '</div>'
        +           '<div class="moyene-shell-widget-transfer-up"></div>'
        +             '<div class="moyene-shell-widget-transfer-tabView moyene-shell-widget-bg">'
        +               '<div class="moyene-shell-widget-transfer-overview moyene-active">'
        +                 '<div class="diskspace">'
        +                   '<i class="fa fa-hdd"></i>'
        +                   '<span class="diskspace-title">Armazenamento</span>'
        +                   '<div class="diskspace-container">'
        + '                  <div class="diskspace-container-fill">'
        + '                   </div>'                    
        + '                     <span class="diskspace-text">65%</span>'                    
        +                   '</div>'
        + '                   <div class="diskspace-container">'
        + '                  <div class="diskspace-container-fill">'
        + '                   </div>'                    
        + '                     <span class="diskspace-text">65%</span>'                    
        +                   '</div>'        
        + '                 </div>'
        + '                 </div>'
        + '                 <div class="moyene-shell-widget-transfer-uploadfile">'
        + '                     <span class="uploadfile-text h-25">Carregar para: <label class="text-secondary">/home/publico/</label>  </span>'                                                                                                            
        + '                 <div class="uploadfile-content dark-transparent-bg h-75">'
        + '                     <span class="text-secondary align-middle">Arraste e Solte ficheiro(s) ou directorio</span>'                                                                                                            
        + '                 </div>'      
        + '                 </div>'
        + '                 <div class="moyene-shell-widget-transfer-uploadmidia">'
        + '                     <span class="uploadfile-text h-25">Carregar para: <label class="text-secondary">/home/multimidia</label>  </span>'                                                                                                            
        + '                     <progress id="progress-bar" class="w-100 "  max=100 value=0></progress>'

        + '                     <div id="drop-area" class="uploadfile-content dark-transparent-bg h-75">'

        + '                       <form class="form-upload">'
        + '                         <label class="align-middle" for="fileElem">Click ou Arraste e Solte ficheiro(s) multimidia</label>'                                                                                                            

        + '                         <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">'
        + '                       </form>'
        + '                       <div id="gallery"></div>'
        + '                     </div>'
        + '                 </div>'         
        + '              <div class="moyene-shell-widget-transfer-devices text-center">'                                            
        + '                 <p class="text-white">Nenhum dispositivo conectado</p> '    
        + '              </div>'
        +         '</div>'
        +       '</div>'
        +     '</div>'
        +   '</div>'

  
      },
      stateMap = {
        $container: null
      },
      jqueryMap = {},
      setJqueryMap, configModule, initModule, onClickTab, _dragDrop, _context_menu;
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
        $widget   : $container.find('.moyene-shell-widget'),
        $tabicons : $container.find('.moyene-shell-widget-transfer-tab'),
        $tabView  : $container.find('.moyene-shell-widget-transfer-tabView'),
        $tabOverview  : $container.find('.moyene-shell-widget-transfer-overview'),
        $tabFile      : $container.find('.moyene-shell-widget-transfer-uploadfile'),
        $tabMidia     : $container.find('.moyene-shell-widget-transfer-uploadmidia'),
        $tabDevices   : $container.find('.moyene-shell-widget-transfer-devices'),
        dropArea     :  document.getElementById("drop-area")

      };
    };
    // fim metodo DOM  /setJqueryMap/




    _dragDrop = function() {
      // Prevent default drag behaviors
      ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        jqueryMap.dropArea.addEventListener(eventName, preventDefaults, false)   
        document.body.addEventListener(eventName, preventDefaults, false)
      });

            
      // Highlight drop area when item is dragged over it
      ;['dragenter', 'dragover'].forEach(eventName => {
        jqueryMap.dropArea.addEventListener(eventName, highlight, false)
      });

      ;['dragleave', 'drop'].forEach(eventName => {
        jqueryMap.dropArea.addEventListener(eventName, unhighlight, false)
      });

            // Handle dropped files
      jqueryMap.dropArea.addEventListener('drop', handleDrop, false)

      function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      function highlight(e) {
        jqueryMap.dropArea.classList.add('highlight')
      }

      function unhighlight(e) {
        jqueryMap.dropArea.classList.remove('active')
      }

      function handleDrop(e) {
        var dt = e.dataTransfer
        var files = dt.files

        handleFiles(files)
      }

      let uploadProgress = []
      let progressBar = document.getElementById('progress-bar')

      function initializeProgress(numFiles) {
        progressBar.value = 0
        uploadProgress = []

        for(let i = numFiles; i > 0; i--) {
          uploadProgress.push(0)
        }
      }

      function updateProgress(fileNumber, percent) {
        uploadProgress[fileNumber] = percent
        let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
        console.debug('update', fileNumber, percent, total)
        progressBar.value = total
      }

      function handleFiles(files) {
        files = [...files]
        initializeProgress(files.length)
        files.forEach(uploadFile)
        files.forEach(previewFile)
      }

      function previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
          let img = document.createElement('img')
          img.src = reader.result
          document.getElementById('gallery').appendChild(img)
        }
      }

      function uploadFile(file, i) {
        var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
        var xhr = new XMLHttpRequest()
        var formData = new FormData()
        xhr.open('POST', url, true)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

        // Update progress (can be used to show progress indicator)
        xhr.upload.addEventListener("progress", function(e) {
          updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
        })

        xhr.addEventListener('readystatechange', function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            updateProgress(i, 100) // <- Add this
          }
          else if (xhr.readyState == 4 && xhr.status != 200) {
            // Error. Inform the user
          }
        })

        formData.append('upload_preset', 'ujpu6gyk')
        formData.append('file', file)
        xhr.send(formData)
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
      selector: '.context-menu-widget', 
      callback: function(key, options) {
          var m = "clicked: " + key;
          window.console && console.log(m) || alert(m); 
      },
      items: {
          "config": {name: "Configurar", icon: "settings"},
          "remove": {name: "remover", icon: "delete"},

      }
  });

}
// fim metodo DOM  /context-menu/
    //---------------------- FIM METODO DOM ---------------------
  
    //------------------- INICIO MANIPULADOR EVENTO -------------------
    // Inicio metodos publicos /onClickTab/
    // Proposito : 
    //    * Alternar entre diferentes tabs do widget
    //    * Adicionar classe active ao tab selecionado
    //    * Mostrar o conteudo da tab
    // Argumento : event - objecto evento
    // Definicoes : nenhuma
    // Retorno : false - fim evento
    // Excecao : nenhuma
    //
    onClickTab = function( event ) {

      if ( jqueryMap.$tabicons.hasClass("active") ) {
        jqueryMap.$tabicons.removeClass("active");
      }

      $tab_active =  jqueryMap.$tabView.find(".moyene-active")
      
      if ( $tab_active.length ) {
        $tab_active.removeClass("moyene-active")
      }

      if  ($(this).hasClass("tab-overview") ) {
        $(this).addClass("active");
        $tabview = jqueryMap.$container.find(".moyene-shell-widget-transfer-overview");
        $tabview.addClass("moyene-active");

      } else if ($(this).hasClass("tab-uploadfile") ) {
        $(this).addClass("active")
        $tabview = jqueryMap.$container.find(".moyene-shell-widget-transfer-uploadfile");
        $tabview.addClass("moyene-active");

      } else if ($(this).hasClass("tab-uploadmidia") ) {
        $(this).addClass("active")
        $tabview = jqueryMap.$container.find(".moyene-shell-widget-transfer-uploadmidia");
        $tabview.addClass("moyene-active");

      } else if ($(this).hasClass("tab-devices") ) {
        $(this).addClass("active")
        $tabview = jqueryMap.$container.find(".moyene-shell-widget-transfer-devices");
        $tabview.addClass("moyene-active");

      }

      return false;
    }
    // Fim metodos publicos /onClickTab/
    
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
      $container.append( configMap.main_html );
      setJqueryMap();
      _dragDrop();
      // _context_menu();
      // anexar eventos ao widget 
      moyene.util_b.dragElement(jqueryMap.$widget.get(0));
      jqueryMap.$tabicons.click(onClickTab);

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