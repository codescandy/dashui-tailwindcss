'use strict';

(function () {
  var toggle = '[data-toggle="smooth-scroll"]';

  function init(toggle) {
    var options = {
      header: '.navbar.fixed-top',
      offset: '24'
    };

    new SmoothScroll(toggle, options);
  }

  if (typeof SmoothScroll !== 'undefined' && toggle) {
    init(toggle);
  }
})();
