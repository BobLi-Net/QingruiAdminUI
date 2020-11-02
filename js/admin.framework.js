 
$.noConflict();

jQuery(document).ready(function ($) {

	"use strict";
	  
	$('#menuToggle').on('click', function (event) {
		$('body').toggleClass('open');
	});

	$('.search-trigger').on('click', function (event) {
	 
		event.preventDefault();
		event.stopPropagation();
		$('.header-left').addClass('open');
	});

	$('.search-close').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$('.header-left').removeClass('open');
	});
	 

});