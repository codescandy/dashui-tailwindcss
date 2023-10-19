'use strict';

(function () {
  function init() {
    var options = {
      duration: 700,
      easing: 'ease-out-quad',
      once: true
    };
    AOS.init(options);
  }

  if (typeof AOS !== 'undefined') {
    init();
  }
})();
