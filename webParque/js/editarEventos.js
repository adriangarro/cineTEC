$(document).ready(function(){
	$("#eventDateLabel").hide();
	$("#eventDate").hide();

	$('#eventDate').daterangepicker({
		singleDatePicker: true,
		timePicker: true,
		timePickerIncrement: 15, 
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY h:mm A'
        }
	});
});

function showFileInput(type){
	var data = document.getElementById(type);
	var form = document.getElementById("activityForm");
	if (data.value == "Concierto de música clásica") {
		$("#eventDateLabel").show();
		$("#eventDate").show();
	} else if (data.value == "Charla sobre informática") {
		$("#eventDateLabel").show();
		$("#eventDate").show();
	} else if (data.value == "Pinta Caritas") {
		$("#eventDateLabel").show();
		$("#eventDate").show();
	}
}