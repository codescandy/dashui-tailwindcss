'use strict';

(function () {
  // Menu toggle for admin dashboard
  var navToggle = document.getElementById('nav-toggle');
  var dbWrapper = document.getElementById('db-wrapper');

  if (navToggle) {
    navToggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (dbWrapper) {
        dbWrapper.classList.toggle('toggled');
      }
    });
  }

  // Slimscroll for sidebar nav
  var navScroller = document.querySelector('.nav-scroller');

  if (navScroller) {
    new SlimScroll(navScroller, { height: '97%' });
  }

  // Notification dropdown scroll List
  var notificationListScroll = document.querySelector('.notification-list-scroll');

  if (notificationListScroll) {
    new SlimScroll(notificationListScroll, { height: 300 });
  }

  // Default Popover
  var popoverTriggers = document.querySelectorAll('[data-bs-toggle="popover"]');

  if (popoverTriggers.length) {
    popoverTriggers.forEach(function (popoverTriggerEl) {
      new Popover(popoverTriggerEl);
    });
  }

  // Scrollspy
  var scrollSpyElements = document.querySelectorAll('[data-bs-spy="scroll"]');

  if (scrollSpyElements.length) {
    scrollSpyElements.forEach(function (dataSpyEl) {
      new ScrollSpy(dataSpyEl).refresh();
    });
  }

  // Toast
  var toastElements = document.querySelectorAll('.toast');

  if (toastElements.length) {
    toastElements.forEach(function (toastEl) {
      new Toast(toastEl);
    });
  }

  // Performance Chart
  var perfomanceChart = document.getElementById('perfomanceChart');

  if (perfomanceChart) {
    var options = {
      series: [100, 78, 89],
      chart: {
        height: 320,
        type: 'radialBar'
      },
      colors: ['#28a745', '#ffc107', '#dc3545'],
      stroke: {
        lineCap: 'round'
      },
      plotOptions: {
        radialBar: {
          startAngle: -168,
          endAngle: -450,
          hollow: {
            size: '55%'
          },
          track: {
            background: 'transparent'
          },
          dataLabels: {
            show: false
          }
        }
      }
    };

    var chart = new ApexCharts(perfomanceChart, options);
    chart.render();
  }

  // Offcanvas
  var offcanvasElements = document.querySelectorAll('.offcanvas');

  if (offcanvasElements.length) {
    offcanvasElements.forEach(function (offcanvasEl) {
      new Offcanvas(offcanvasEl);
    });
  }
})();
