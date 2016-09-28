// Auhtor: Lukas Havemann
// plugin namespace

hide = {

  _config : {
    cookie : {
      name : 'hide-it-accept',
      days : 7
    }
  },


  /**
   * Initializes the Splashscreen functionality
   * @return {[type]} [description]
   */
  init: function() {
    hide._dom = {
      selectors : {
        accept : 'hide-accept',
        dismiss : 'hide-close'
      },
      splash : document.getElementById('hide-it')
    };

    hide._bindEventHandlers();
  },

  _bindEventHandlers: function() {
    document.addEventListener('click', function (e) {

      if(e.target.className === hide._dom.selectors.accept) {
        hide.accept();
        hide.dismiss();
      }

      if(e.target.className === hide._dom.selectors.dismiss) {
        hide.dismiss();
      }
    });
  },

  /** 
   * Hides the Splashscreen
   */
  dismiss : function() {
    hide._dom.splash.style.display = 'none';
  },

  /**
   * TODO
   * @return {[type]} [description]
   */
  accept : function() {
    hide.cookie.set(hide._config.cookie.name, true, hide._config.cookie.days);
  },

  /** 
   * [hasAccepted description]
   * @return {Boolean} true if user has already seen and accepted the splashscreen
   */
  hasAccepted : function() {
    return hide.cookie.get(hide._config.cookie.name) === 'true';
  },

  loaded : function() {
    if(hide.hasAccepted()) {
      hide.dismiss();
    }

    document.getElementById('hide-loading-indicator').style.display = 'none';
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
      document.cookie = 
        key + "=" + escape(value) + 
        ((expiringDays) ? "" : "; expires=" + date.toUTCString());
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

// simple cross browser document ready solution
(function() {
  hide.init();
})();