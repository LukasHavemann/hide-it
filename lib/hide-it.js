// Auhtor: Lukas Havemann
// plugin namespace

// simple cross browser document ready solution
(function() {
  var _dom = {
    splash : 'hide-it',
    hide : 'hide-splashscreen',
    accept : 'hide-accept',
    dismiss : 'hide-close',
    loadingIndicator : 'hide-loading-indicator'
  };

  var $ = function(selector) {
    var elem = document.getElementById(selector);

    if(elem === void 0 || elem === null) {
      throw new Error('the html for the splashscreen is missing: #' + selector);
    }

    return elem;
  };

  // expose hide-it functionality via global hide variable
  hide = {
    config : {
      timeout : 10000,
      cookie : {
        name : 'hide-it-accept',
        days : 7
      },

      language: {
        default : 'en',
        en : {
          title : 'Welcome to xyz.com!',
          content : 'i am a hide-it splashscreen',
          accept : 'Ok',
          error : 'something wen\'t wrong! pleare reload'
        }
      }
    },

    /**
     * Initializes the Splashscreen functionality
     * @return {[type]} [description]
     */
    init: function() {
      hide._bindEventHandlers();

      if (hide._getLanguage() !=  hide.config.language.default) { 
        hide.
      }

      setTimeout(function() { 
        console.log('timeout! ');
      }, hide.config.timeout);
    },

    _bindEventHandlers: function() {
      document.addEventListener('click', function (e) {

        if(e.target.className === _dom.accept) {
          hide.accept();
          hide.dismiss();
        }

        if(e.target.className === _dom.dismiss) {
          hide.dismiss();
        }
      });
    },

    /**
     * returns the preferred language of the user
     * @return {String} [description]
     */
    _getLanguage: function() {
      return window.navigator.language.split('_')[0];
    },

    /** 
     * Hides the Splashscreen
     */
    dismiss : function() {
      $(_dom.splash).classList.add(_dom.hide);
    },

    /**
     * TODO
     * @return {[type]} [description]
     */
    accept : function() {
      hide.cookie.set(hide.config.cookie.name, true, hide.config.cookie.days);
    },

    /** 
     * [hasAccepted description]
     * @return {Boolean} true if user has already seen and accepted the splashscreen
     */
    hasAccepted : function() {
      return hide.cookie.get(hide.config.cookie.name) === 'true';
    },

    loaded : function() {
      if(hide.hasAccepted()) {
        hide.dismiss();
      }

      $(_dom.loadingIndicator).style.display = 'none';
    },

    cookie : {
      
      /**
       * Saves the given value under given key for expiringDays
       * @param {String} key          cookie name
       * @param {[type]} value        [description]
       * @param {[type]} expiringDays [description]
       */
      set : function(key, value, expiringDays) {
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
      get: function(key) {
        if (document.cookie.length > 0) {
          var start = document.cookie.indexOf(key + "=");
          if (start != -1) {
            start = start + key.length + 1;

            var end = document.cookie.indexOf(";", start);
            if (end == -1) {
              end = document.cookie.length;
            }

            return unescape(document.cookie.substring(start, end));
          }
        }
       
        return void 0;
      }
    }
  };
})();