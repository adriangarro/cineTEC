$(document).ready(function(){
	// Se inicializan algunos 
	$("#eventsImage").hide();
	$("#eventsImage").fadeIn(1000);


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