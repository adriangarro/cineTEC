$(document).ready(function(){
	// Se inicializan algunos 
	$("#activitiesImage").hide();
	$("#activitiesImage").fadeIn(1000);

	$('#activityDate').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});
});