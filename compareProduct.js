/**
 * JS to handle the compareProduct page .
 * 
 */
$(document).ready( function() {

	$("#compare_table").dataTable({
		"bFilter": false, 	
		"bSort": false,		
		"bPaginate": false,	
		"bInfo": false,		
	});
	var totalCol = parseInt($('#len').val());
	if( totalCol == 2 ){
		$("[id^='removeLink_']").remove();
	}

});

function closeDiv( colNumber ){
	var totalCol = parseInt($('#len').val());
	var table = $('#compare_table').dataTable();
	if( totalCol == 3 ){
		/*Get all IDs starting with 'removeLink_' and remove them from the html*/
		$("[id^='removeLink_']").remove();
	}
	totalCol = totalCol - 1;		
	$('#len').val(totalCol);
	table.fnSetColumnVis( colNumber , false );
}

function changeImageSrc(imgelement, newsrc){
	$("#"+imgelement).attr( 'src' , newsrc );
	$("#compareImageBox").modal();
	return false;	
}
