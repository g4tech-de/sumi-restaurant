(function($,sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				                  func.apply(obj, args);
				timeout = null;
			}
			;
			if (timeout)
			              clearTimeout(timeout); else if (execAsap)
			              func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		}
		;
	}
	// smartresize 
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	}
	;
}
)(jQuery,'smartresize');


$(document).ready(function() {

	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////
	function setHomeBannerHeight() {
		var windowHeight = $(window).height();
		jQuery('#header').height(windowHeight);
	}
	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////
	function centerHomeBannerText() {
		var bannerText = jQuery('#header > .center');
		var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 20;
		bannerText.css('padding-top', bannerTextTop+'px');
		bannerText.show();
	}
	setHomeBannerHeight();
	centerHomeBannerText();
	//Resize events
	jQuery(window).smartresize(function() {
		setHomeBannerHeight();
		centerHomeBannerText();
	});
	
	function scroll() {
	    var top = $(window).scrollTop();
	    var heightMin = window.innerHeight*0.75;
	    var heightMax = window.innerHeight*0.8;
	    var heightEnd = window.innerHeight*0.2;
	    var drinkMenu = $('#facts').position().top;
		if ((drinkMenu - top) < heightMax && (drinkMenu - top) > heightMin) {

		}
	}
	document.onscroll = scroll;
	var $scrollDownArrow = $('#scrollDownArrow');
	var animateScrollDownArrow = function() {
		$scrollDownArrow.animate( {
			top: 5,
		}
		, 400, "linear", function() {
			$scrollDownArrow.animate( {
				top: -5,
			}
			, 400, "linear", function() {
				animateScrollDownArrow();
			}
			);
		});
	}
	animateScrollDownArrow();
    var $scrollUpArrow = $('#scrollUpArrow');
    var animateScrollUpArrow = function() {
        $scrollUpArrow.animate( {
                top: 5,
            }
            , 400, "linear", function() {
                $scrollUpArrow.animate( {
                        top: -5,
                    }
                    , 400, "linear", function() {
                        animateScrollUpArrow();
                    }
                );
            });
    }
    animateScrollUpArrow();
	//Set Down Arrow Button
	jQuery('#scrollDownArrow').click(function(e) {
		e.preventDefault();
		jQuery.scrollTo("#story", 1000, {
			offset:-(jQuery('#header #menu').height()), axis:'y'
		}
		);
	});
	jQuery('.nav > li > a, #logo a').click(function(e) {
		e.preventDefault();

		jQuery.scrollTo(jQuery(this).attr('href'), 400, {
			offset:-(jQuery('#header #menu').height()), axis:'y'
		}
		);
	});

});