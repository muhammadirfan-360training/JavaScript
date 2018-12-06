$(function () {
	
	jQuery.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) jQuery.support.placeholder = true;
	
	if (!$.support.placeholder) {		
		$('.field').find ('label').show();
		
	}
});

function resetPassword(){
	
	// Perform validation (if username is written)
		if(document.forgotPasswordForm.username.value == '' || document.forgotPasswordForm.username.value != document.forgotPasswordForm.username.value.trim()) {
			message = "Please provide valid username";
			$("#usernamefield").removeClass("field").addClass("control-group error");
			$("#errorNotifier").html("<span class='a11 text-red b'>" + message + "</span>");
			return false;
		}
		else {
			$("#usernamefield").removeClass("field").addClass("control-group success");
		}
	// Now submit
	document.forgotPasswordForm.submit();
}