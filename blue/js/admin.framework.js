 
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
	var a = 0;
	$('.btn-fullscreen').on('click', function() {
	  a++;
	  a % 2 == 1 ? enterfullscreen() : exitfullscreen();
	})

});


//控制全屏
function enterfullscreen() { //进入全屏
	 
	var docElm = document.documentElement;
	//W3C
	if(docElm.requestFullscreen) {
	  docElm.requestFullscreen();
	}
	//FireFox
	else if(docElm.mozRequestFullScreen) {
	  docElm.mozRequestFullScreen();
	}
	//Chrome等
	else if(docElm.webkitRequestFullScreen) {
	  docElm.webkitRequestFullScreen();
	}
	//IE11
	else if(elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	}
  }
   
  function exitfullscreen() { //退出全屏 
	if(document.exitFullscreen) {
	  document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
	  document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
	  document.webkitCancelFullScreen();
	} else if(document.msExitFullscreen) {
	  document.msExitFullscreen();
	}
  }
   
