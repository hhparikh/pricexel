"use strict";

// @codekit-prepend "min/jquery-3.1.1.min.js"
// @codekit-prepend "min/jquery.easing.1.3-min.js"

(function($){
	
	var advenTour = {
		
		scrollTo: function() {
			var anchors = $('a[href^="#"]:not([href="#"]):not([href="#_"])');
			var offset = 0;
			
			anchors.on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				
				var anchor = $(this);
				var id = anchor.attr('href');
				var offsetTop = $(id).offset().top;
				
				$('html, body').stop().animate({scrollTop: offsetTop - offset}, 1000, 'easeInOutExpo');
			});
		},
		
		validateEmail: function(email){
			var emailReg = /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
			return emailReg.test(email);
		},
		
		hideValidationMsg: function(){
			if(!$('.msg').hasClass('hidden')){
				$('.msg').removeClass('error success');
				$('.msg').addClass('hidden');
				setTimeout(function() {
					$('.msg').html('');
				}, 1000);
			}
		},
		
		handleForms: function(){
			
			$('form button, form input[type="submit"]').on('click', function(e){
				e.preventDefault();
				var parent = $(this).closest('form');
				var email = parent.find('input[type="email"]');
				var email_val = email.val();
				var msg = $('.msg');
				var error = false;
				
				parent.find('.invalid').removeClass('invalid');
				
				$('#loading').addClass('active');
				
				parent.find('.required').each(function(){
					if($(this).val().length === 0){
						$(this).addClass('invalid');
						if(!error){
							error = true;
						}
					}
				});
				
				if(!advenTour.validateEmail(email_val) || email_val.length === 0){
					error = true;
					email.addClass('invalid');
				}
				
				if(!error){
					if(msg.hasClass('error')){
						msg.addClass('hidden');	
					}
					setTimeout(function() {
						msg.html('<strong>Thank you!</strong> Your message was sucessfuly sent.');
						msg.removeClass('error hidden');
						msg.addClass('success');
						$('#loading').removeClass('active');	
					}, 500);
					
					// Do something here if the form is valid
					
				} else{
					
					// Do something here if the for is NOT valid
					
					setTimeout(function() {
		            	if(!msg.hasClass('error')){
							msg.removeClass('success hidden');
							msg.addClass('error');
						}
						msg.html('<strong>There was an error!</strong> Please fill all required fields.');
						$('#loading').removeClass('active');
		        	}, 500);
				}
				
				setTimeout(function(){
					advenTour.hideValidationMsg();
				}, 10000);
			});
			
			$('.msg').hover(function(){
				advenTour.hideValidationMsg();
			});
		},
		
		init: function() {
			this.scrollTo();
			this.handleForms();
		}
	};
	
	$(document).ready(function() {
		advenTour.init();
	});
	
	$(window).scroll(function(){
		
		var delay = 0;
		
		$('.fade-in').each( function(i){
			var bottom_of_object = $(this).offset().top;
			var bottom_of_window = $(window).scrollTop() + $(window).height() / 1.5;
			//delay += 100;
			
			if( bottom_of_window > bottom_of_object ){
				var self = $(this);
				setTimeout(function() {
					self.addClass('faded');
				}, delay);
			}
		}); 
	
	}).scroll();
	
})(jQuery);