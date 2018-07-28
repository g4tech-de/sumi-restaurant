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

var windowLastHeight = 0;

$(document).ready(function() {

	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////
	function setHomeBannerHeight() {
		var windowHeight = $(window).height();
		if (windowHeight < 320) {
		    windowHeight += 25;
        }
		if (Math.abs(windowHeight - windowLastHeight) > 150) {
            jQuery('#header').height(windowHeight);
            windowLastHeight = $(window).height();
        }
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
	
	/*function scroll() {
	    var top = $(window).scrollTop();
	    var heightMin = window.innerHeight*0.75;
	    var heightMax = window.innerHeight*0.8;
	    var heightEnd = window.innerHeight*0.2;
	    var drinkMenu = $('#story').position().top + $('#story').outerHeight(true);
		if ((drinkMenu - top) < heightMax && (drinkMenu - top) > heightMin) {
            $('#facts').css('top', drinkMenu + 'px');
            $('#facts').show();
		}
	}
	document.onscroll = scroll;*/
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

$(window).bind('scroll',function(e){
    parallaxScroll();
});

function parallaxScroll(){
    var top = $(window).scrollTop();
    var scrolled = (0 - $(window).height()*0.1)+'px';
    if (top < $('#food-menu').position().top) {
        $('#fact-background').css('top',scrolled);
        $('#food-background').css('top','-5000px');
        $('#chef-background').css('top','-5000px');
    } else if (top < $('#reservation').position().top) {
        $('#food-background').css('top',scrolled);
        $('#fact-background').css('top', '-5000px');
        $('#chef-background').css('top','-5000px');
    } else {
        $('#chef-background').css('top',scrolled);
        $('#food-background').css('top','-5000px');
        $('#fact-background').css('top', '-5000px');
    }

    /*$('#parallax-bg2').css('top',(0-(scrolled*.5))+'px');
    $('#parallax-bg3').css('top',(0-(scrolled*.75))+'px');*/
}
