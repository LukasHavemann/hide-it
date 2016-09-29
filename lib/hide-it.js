// Auhtor: Lukas Havemann
// plugin namespace

// simple cross browser document ready solution
(function(globals) {
  "use strict";

  var _dom = {
    splash : 'hide-it',
    accept : 'hide-accept',
    dismiss : 'hide-close',
    loadingIndicator : 'hide-loading-indicator',
    title : 'hide-title',
    content : 'hide-content'
  };

  function $id(selector) {
    var elem = document.getElementById(selector);

    if(elem === void 0 || elem === null) {
      throw new Error('HTML-Element with id ' + selector + ' is missing!');
    }

    return elem;
  }

  function $class(selector) {
    var elem = document.getElementsByClassName(selector);

    if(elem === void 0 || elem === null) {
      throw new Error('HTML-Element with class ' + selector + ' is missing!');
    }

    // convert to normal list
    return  Array.prototype.slice.call(elem);
  }


  var cookie = {  
    /**
     * Saves the given value under given key for expiringDays
     * @param {String} key          cookie name
     * @param {[type]} value        [description]
     * @param {[type]} expiringDays [description]
     */
    set(key, value, expiringDays) {
      var date = new Date();
      date.setDate(date.getDate() + expiringDays);

      var val = key + "=" + escape(value) + 
        ((expiringDays) ? '; expires=' + date.toUTCString() : '');
      
      document.cookie = val;
    },

    /**
     * Return the value for given cookie name
     * @param  {String} key cookie name
     * @return {String} cookie value or undefined if not set
     */
    get(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;

          var end = document.cookie.indexOf(";", start);
          if (end === -1) {
            end = document.cookie.length;
          }

          return unescape(document.cookie.substring(start, end));
        }
      }
     
      return void 0;
    }
  };

  function bindEventHandlers() {
    document.addEventListener('click', function(event) {

      if(event.target.className.indexOf(_dom.accept) >= 0) {
        hide.accept();
        hide.dismiss();
      }

      if(event.target.className.indexOf(_dom.dismiss) >= 0) {
        hide.dismiss();
      }
    });
  }

  /**
   * returns the preferred language of the user
   * @return {String} [description]
   */
  function getLanguage() {
    var preferredUserLanguage = window.navigator.language.split('-')[0];
    if(hide.config.language[preferredUserLanguage] === void 0) {
      console.warn('translation for preferred user language ' + preferredUserLanguage + ' not given!' );
      return config.language.default;
    }

    return preferredUserLanguage;
  }

  function renderText(text) {
    changeTextForClass(_dom.content, text.content);
    changeTextForClass(_dom.title, text.title);
    changeTextForClass(_dom.accept, text.accept);
  }

  /**
   * Changes the text of all nodes with the given CSS-Class
   * @param  {String} cssClass [description]
   * @param  {String} text     [description]
   * @return {[type]}          [description]
   */
  function changeTextForClass(cssClass, text) {
    $class(cssClass).forEach(function(elem) {
      elem.innerHTML = text;
    });
  }

  function validateConfig() {
    var language = hide.config.language.default;
    if(hide.config.language[language] === void 0) {
      throw new Error('no translation for defaultLanguage: ' + language + ' given!');
    }
  }

  // expose hide-it functionality via global hide variable
  globals.hide = {
    config : {
      timeout : 10000,
      cookie : {
        name : 'hide-it-accept',
        days : 7
      },

      language: {
        default : 'en',
        en : {
          title : 'Welcome to hide-it!',
          content : 'i am a hide-it splashscreen',
          accept : 'I understand',
          error : 'something wen\'t wrong! please reload'
        }
      }
    },

    /**
     * Initializes the Splashscreen functionality
     * @return {[type]} [description]
     */
    init: function() {
      validateConfig();
      bindEventHandlers();

      if(getLanguage() !== hide.config.language.default) { 
        renderText(hide.config.language[getLanguage()]);
      }

      setTimeout(function() { 
        console.log('timeout! ');
      }, hide.config.timeout);
    },

    /** 
     * Hides the Splashscreen
     */
    dismiss : function() {
      $id(_dom.splash).style.display = 'none';
    },

    /**
     * TODO
     * @return {[type]} [description]
     */
    accept : function() {
      cookie.set(hide.config.cookie.name, true, hide.config.cookie.days);
    },

    /** 
     * [hasAccepted description]
     * @return {Boolean} true if user has already seen and accepted the splashscreen
     */
    hasAccepted : function() {
      return cookie.get(hide.config.cookie.name) === 'true';
    },

    /**
     * should be called when Application finished loading
     */
    loaded : function() {
      if(hide.hasAccepted()) {
        hide.dismiss();
      }

      $id(_dom.loadingIndicator).style.display = 'none';
    }
  };
})(this);