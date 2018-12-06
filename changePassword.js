$(function () {
	
	jQuery.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) 
		jQuery.support.placeholder = true;
	
	if (!$.support.placeholder) {
		$('.field').find ('label').show();		
	}
});

function changePassword(){

	oldP = document.changePasswordForm.oldPassword.value;
	newP = document.changePasswordForm.newPassword.value;
	cP = document.changePasswordForm.confirmPassword.value;

	oldPt = document.changePasswordForm.oldPassword.value.trim();
	newPt = document.changePasswordForm.newPassword.value.trim();
	cPt = document.changePasswordForm.confirmPassword.value.trim();
	
	
	// Perform validation (if oldPassword / newPassword / confirmPassword is written)
	if( oldP == '' || newP == '' || cP == '' || oldP == newP || newP != cP ||
			oldP != oldPt || newP != newPt || cP != cPt || newP.length < 6) {
		
		message="";
		
		// check if original values and trimmed values match i.e. no spaces

		if(oldP == '' || newP != newPt || newP.length < 6) {
			if(oldP == '') {			
				$("#oldPasswordField").removeClass("field success").addClass("control-group error");
				message = "<br> Old Password can not be empty";
			} else {
				$("#oldPasswordField").removeClass("field error").addClass("control-group success");
			}
		
			if(newP != newPt ) {			
				$("#newPasswordField").removeClass("field success").addClass("control-group error");
				document.changePasswordForm.newPassword.value="";
				message = message + "<br> New Password can not contain spaces";
			} else if(newP.length < 6) {
				$("#newPasswordField").removeClass("field success").addClass("control-group error");
				message = message + "<br>New Password must be 6 or more characters";
			} else {
				$("#newPasswordField").removeClass("field error").addClass("control-group success");
			}
		} else { 			
			if(	oldP == newP ) {
				$("#newPasswordField").removeClass("field success").addClass("control-group error");
				document.changePasswordForm.newPassword.value="";
				message = message + "<br> Old and New passwords can not be same ";
			} else {
				$("#newPasswordField").removeClass("field error").addClass("control-group success");
			}	
			if(	newP != cP) {
				$("#confirmPasswordField").removeClass("field success").addClass("control-group error");
				document.changePasswordForm.confirmPassword.value="";
				message = message +	"<br> New and Re-entered passwords must match";			
			} else {
				$("#confirmPasswordField").removeClass("field error").addClass("control-group success");
			}
		}
		notifyError(message);	
		return false;
	} else { 	
	// Now submit
	document.changePasswordForm.submit();
	}
}

function notifyError(message) {
$("#errorNotifier").html("<span class='a11 text-red b'>" + message + "</span>");	
}