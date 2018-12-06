$(function () {
	performBrowserTest();

	$.pnotify.defaults.history = false;
	jQuery.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) jQuery.support.placeholder = true;
	
	if (!$.support.placeholder) {
		
		$('.field').find ('label').show();
		
	}
	url = $(location).attr('href');
	if(url.indexOf("sessionExpired=true") > -1 ) {
		$.pnotify({
			title: 'Error',
			text: "Please login to access requested resource",
			type: 'error',
			closer: false,
	        sticker: false,
			opacity: .8
			});
	} else if($("#url").val().length > 0) {
		$.pnotify({
			title: 'Error',
			text: "Please login to access requested resource",
			type: 'error',
			closer: false,
	        sticker: false,
			opacity: .8
			});		
	} else if(url.indexOf("redirect=changePassword") > -1 ) {
		$.pnotify({
			title: 'Success',
			text: "Please login with new password",
			type: 'success',
			closer: false,
	        sticker: false,
			opacity: .8
			});
	} else if(url.indexOf("redirect=resetPassword") > -1 ) {
		$.pnotify({
			title: 'Success',
			text: "Your new password sent to you via Email",
			type: 'success',
			closer: false,
	        sticker: false,
			opacity: .8
			});
	}

});

function normaluserLogin(){
	
	// Perform validation (if username / password is written)
	if(document.loginForm.username.value == '' || document.loginForm.password.value == '') {
		
		//alert(document.loginForm.password.value);
		if(document.loginForm.username.value == '') {
			
			$("#usernamefield").removeClass("field").addClass("control-group error");
		
		}
		else {
			$("#usernamefield").removeClass("field").addClass("control-group success");
		}
			
		if(document.loginForm.password.value == '') {
			$("#passwordfield").removeClass("field").addClass("control-group error");
		}
		else {
			$("#passwordfield").removeClass("field").addClass("control-group success");
		}
		
		return false;
	} 
	
	
	// Now submit
	document.loginForm.j_username.value = document.loginForm.username.value;
	document.loginForm.j_password.value = document.loginForm.password.value;
	document.loginForm.submit();
}

function performBrowserTest() {
	var name = $.browser.name;
	var version = $.browser.version;
	var versionNumber = parseInt(version, 10);
	var userAgentStr = navigator.userAgent;	
	// Trident is the layout engine for IE 11
	var trident = {
		    string: userAgentStr.match(/Trident\/(\d+)/),
		    rvStr: userAgentStr.match(/rv:(\d+)/)
		  };
	// get version of Trident
	trident.version = trident.string ? parseInt(trident.string[1], 10) : -1;
	// get version of IE from rv in userAgent string
	trident.rv = trident.rvStr ? parseInt(trident.rvStr[1], 10) : -1;	
    $.reject({    
        beforeReject: function() { 
//        	this.reject['unknown']= true;
            if ( (name.toLowerCase() === 'msie' || $.browser.msie ) && versionNumber <= 8) {
                this.reject['msie']= true;
                this.reject['unknown']= true;                                
            } else if (trident.version > -1 && trident.rv >= 9) {
            	// trident version > -1 means it is IE and rv is IE version 
            	this.reject['mozilla']= false;            	
            	this.reject['unknown']= false;            	            	
            } else {
            	this.reject['unknown']= true;            	
            }
        },
        browserInfo: { // Settings for which browsers to display  
            firefox: {  
                text: 'Mozilla Firefox', // Text below the icon  
            },  
            safari: {  
                text: 'Safari',  
            },  
            opera: {  
                text: 'Opera',  
            },  
            chrome: {  
                text: 'Chrome',  
            },  
            msie: {  
                text: 'Internet Explorer',  
            }
        },

    	imagePath: './../img/browsers/', // Path where images are located
        //close: false
    	//closeCookie: true
    }); // Customized Browsers  
	
}
