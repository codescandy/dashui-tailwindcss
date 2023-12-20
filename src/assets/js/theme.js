('use strict');

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

	const toastTrigger = document.getElementById('liveToastBtn');
	const toastLiveExample = document.getElementById('liveToast');

	if (toastTrigger) {
		const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
		toastTrigger.addEventListener('click', () => {
			toastBootstrap.show();
		});
	}

	// Performance Chart
	var perfomanceChart = document.getElementById('perfomanceChart');

	if (perfomanceChart) {
		var options = {
			series: [100, 78, 89],
			chart: {
				height: 320,
				type: 'radialBar',
			},
			colors: ['#28a745', '#ffc107', '#dc3545'],
			stroke: {
				lineCap: 'round',
			},
			plotOptions: {
				radialBar: {
					startAngle: -168,
					endAngle: -450,
					hollow: {
						size: '55%',
					},
					track: {
						background: 'transparent',
					},
					dataLabels: {
						show: false,
					},
				},
			},
		};

		var chart = new ApexCharts(perfomanceChart, options);
		chart.render();
	}

	// Offcanvas
	var offcanvasElements = document.querySelectorAll('.offcanvas');

	if (offcanvasElements.length) {
		const offcanvasElementList = document.querySelectorAll('.offcanvas');
		const offcanvasList = [...offcanvasElementList].map((offcanvasEl) => new bootstrap.Offcanvas(offcanvasEl));
	}

	// Dropzone
	var dropzoneElements = document.querySelectorAll('#my-dropzone');

	if (dropzoneElements.length) {
		Dropzone.autoDiscover = false;

		const myDropzone = new Dropzone('#my-dropzone', {
			url: 'https://httpbin.org/post',
			maxFilesize: 5,
			acceptedFiles: 'image/*',
			addRemoveLinks: true,
			autoProcessQueue: true,
		});

		// Add event listeners
		myDropzone.on('addedfile', function (file) {
			console.log('File added: ' + file.name);
		});

		myDropzone.on('removedfile', function (file) {
			console.log('File removed: ' + file.name);
		});

		myDropzone.on('success', function (file, response) {
			console.log('File uploaded successfully:', response);
		});
	}

	// Tooltips

	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

	if (tooltipTriggerList.length) {
		const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
	}

	// Feather.js
	feather.replace();
})();
