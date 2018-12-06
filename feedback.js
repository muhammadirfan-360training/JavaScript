$(function(){
	$('#ftype').selectpicker();
	$.pnotify.defaults.history = false;
});

function addfeedback(id,sku,ds,cid,locale,url,requiredFields,selectFeedback,feedbackSubmitted,pleaseSelectType,writeText){	
	requiredFields = requiredFields.replace(/quot;/g,"'");
	selectFeedback = selectFeedback.replace(/quot;/g,"'");
	feedbackSubmitted = feedbackSubmitted.replace(/quot;/g,"'");
	pleaseSelectType = pleaseSelectType.replace(/quot;/g,"'");
	writeText = writeText.replace(/quot;/g,"'");

	var feedbackImagesUrl = $('#feedbackImagesUrl').val();
	var feedbackTxt = $.trim($('#ftext').val());
	var fullFtext= encodeURIComponent(feedbackTxt);
	var commentLen = $('#ftext').val().length;
	var ftype =  $('#ftype').val();
	var msgElement = $("#hF"); 
    var fbTxtLimit = $("#label_feedback_limit").val();
	fbType=true;
	
	if(commentLen > 4000){
        msgElement.prop('class','text-red b');
        msgElement.html(fbTxtLimit);
        clrFeedback(true);
        msgElement.show();
        msgElement.delay(3000).hide("fade", {}, 1000);
	}else if(fbType==true && feedbackTxt != selectFeedback && feedbackTxt !="" ){
       var params = 'mode=custfeedback&type='+ftype+'&text='+fullFtext+'&id=' + id + '&sku=' + sku + '&dataSource=' + ds + '&catalog=' + cid + '&locale=' + locale+'&feedbackImagesUrl='+feedbackImagesUrl;
       var fbErrorLabel = $("#label_feedback_error").val();
       
   	   $("#submit_btn").attr("disabled","");
	   $('#update_status').show();
      
       $.ajax({
   	    url: url + '?' + params,
   	    dataType: 'html',
   	    timeout: 30000
   	   })
   	   .done( function(data) {
   	    	$('#update_status').hide();
   	     	$('#submit_btn').removeAttr("disabled");
   	        clrFeedback(true);
   	        $('#feedbackContainer').collapse('toggle');
	   	     $.pnotify({
					title: 'Success',
					text: feedbackSubmitted,
					type: 'success',
					closer: false,
			        sticker: false,
					opacity: .8
				});	
   	    })
 	   .fail(function() {
   	    	$('#update_status').hide();
   	     	$('#submit_btn').removeAttr("disabled");
   	    	
   	        msgElement.prop('class','text-red b');
   	        msgElement.html(fbErrorLabel);
   	        msgElement.show();
   	        msgElement.delay(3000).hide("fade", {}, 1000);
   	    });
	   
    }
    else if(fbType==false && (feedbackTxt != selectFeedback || feedbackTxt != "")){
        msgElement.prop('class','text-red b');
        msgElement.html(pleaseSelectType);
        clrFeedback(true);
        msgElement.show();
        msgElement.delay(3000).hide("fade", {}, 1000);
    }
    else if(fbType==true && (feedbackTxt == selectFeedback || feedbackTxt == "")){
        msgElement.prop('class','text-red b');
        msgElement.html(writeText);
        //clrFeedback(true);
        msgElement.show();
        msgElement.delay(3000).hide("fade", {}, 1000);
    }
	//$('hF').innerHTML="&nbsp;";	
}
function handleFilePickerDialog(fpApiKey, s3ResourceBucket, limitReachedText) {

	if(feedbackImageArray.length >= fbImageUploadLimit) {
		var msgElement = $('#hF');
		msgElement.prop('class','text-red b');
		msgElement.html(limitReachedText);
		msgElement.show();
		msgElement.delay(3000).hide("fade", {}, 1000);
		return;
	}

	filepicker.setKey(fpApiKey);
	var mimeTypes = $("#feedbackMimeType").val().split(",");
	filepicker.pickAndStore(			
			{
				multiple: true,
				"services": ["COMPUTER", "GOOGLE_DRIVE", "DROPBOX", "FTP", "URL"], 
				"mimetype": mimeTypes, 
				"container": "modal", 
				"openTo": "COMPUTER"
			},
			{
				location:"S3",
				container:s3ResourceBucket,
				path:'/ProductFeedback/'
			},
			addFeedbackImages);

}
function addFeedbackImages(fpfiles) {
	
	// Change class if this is first file
	if(feedbackImageArray.length == 0) {
		jQuery('#noFilesAttachedDiv').hide();
		jQuery('#filesListDiv').show();
	}
	
	for(var i=0;i<fpfiles.length;i++){		
		var filename_url = fpfiles[i].filename + "~~"  + fpfiles[i].url;
		feedbackImageArray.push(filename_url);
		
		var _filename_url = "'" + fpfiles[i].filename + "~~"  + fpfiles[i].url + "'";
		
		var filename = fpfiles[i].filename;
		
		if (fpfiles[i].filename.length > 22)
			filename =  fpfiles[i].filename.substring(0,22) + '...';
		
		var html = '<span title="'+fpfiles[i].filename+'"><a class="btn-link" style="text-decoration:none" onclick="removeFeedbackUrl(this,'+ _filename_url +')"> <span class="a13">[x] </span></a><span>' + filename + 
		'</span><br></span>';
		
		jQuery("#filesListDiv").append(html);
		
		if (feedbackImageArray.length >= fbImageUploadLimit) {
			break;
		}	
	}
	document.getElementById("feedbackImagesUrl").value = feedbackImageArray.join("||");
	
}

function removeFeedbackUrl(element,removeItem) {
	jQuery(element).parent().remove();
	feedbackImageArray = jQuery.grep(feedbackImageArray, function(value) {
		  return value != removeItem;
	});
	document.getElementById("feedbackImagesUrl").value = feedbackImageArray.join("||");
	
	// Reset to no images if Zero
	if(feedbackImageArray.length == 0) {
		jQuery('#filesListDiv').hide();
		jQuery('#noFilesAttachedDiv').show();
	}
	
}

function clrFeedback(keepScreen){
	
	// Reset uploadImageLinkDiv only if files were attached
	if(feedbackImageArray.length > 0) {
		$('#filesListDiv').hide();
		$('#noFilesAttachedDiv').show();
	}

	$('#filesListDiv').html(' ');
	$("#feedbackImagesUrl").val('');
	feedbackImageArray.length = 0;
	$('#ftype option:first-child').prop("selected", true);
	$('#ftype').change();
	/*
	if(!keepScreen)
		$('#feedRegion').style.display="none";
	*/
	
	$('#ftext').val('');
	
	if(lastId===undefined){}
	else{
	$(lastId).className="colorB";
	$(lastId+"a").style.display="none";
	}
	fbType=false;
}
function clearText(theField){
	if (theField.defaultValue == theField.value)
    	theField.value = '';
}
 

var feedbackImageArray = new Array();
var fbImageUploadLimit = 5;
var fbType=false;
var fbDone=false;
var lastId;

function clrFileUpload(keepScreen){
	
	// Reset uploadImageLinkDiv only if files were attached
	if(feedbackImageArray.length > 0) {
		$('#filesListDiv').hide();
		$('#noFilesAttachedDiv').show();
	}

	$('#filesListDiv').html(' ');
	$("#feedbackImagesUrl").val('');
	feedbackImageArray.length = 0;
	$('#ftype option:first-child').prop("selected", true);
	$('#ftype').change();
	
	document.getElementById('dateCheck').checked=false;
	/*
	if(!keepScreen)
		$('#feedRegion').style.display="none";
	*/
	
	$('#ftext').val('');
	
	if(lastId===undefined){}
	else{
	$(lastId).className="colorB";
	$(lastId+"a").style.display="none";
	}
	fbType=false;
}