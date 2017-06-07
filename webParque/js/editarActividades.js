$(document).ready(function(){
	$("#activityDateLabel").hide();
	$("#activityDate").hide();
	$("#horarioActividadLabel").hide();
	$("#horarioActividad").hide();
	$("#estadoActividadLabel").hide();
	$("#estadoActividad").hide();

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
	if (data.value == "Clase de baile") {
		$("#activityDateLabel").show();
		$("#activityDate").show();
		$("#horarioActividadLabel").show();
		$("#horarioActividad").show();
		$("#estadoActividadLabel").show();
		$("#estadoActividad").show();
	} else if (data.value == "Clase de aerobicos") {
		$("#activityDateLabel").show();
		$("#activityDate").show();
		$("#horarioActividadLabel").show();
		$("#horarioActividad").show();
		$("#estadoActividadLabel").show();
		$("#estadoActividad").show();
	} else if (data.value == "Clase de cocina") {
		$("#activityDateLabel").show();
		$("#activityDate").show();
		$("#horarioActividadLabel").show();
		$("#horarioActividad").show();
		$("#estadoActividadLabel").show();
		$("#estadoActividad").show();
	} else if (data.value == "Clase de tejido a crochet") {
		$("#activityDateLabel").show();
		$("#activityDate").show();
		$("#horarioActividadLabel").show();
		$("#horarioActividad").show();
		$("#estadoActividadLabel").show();
		$("#estadoActividad").show();
	} else if (data.value == "Clase de cultura precolombina") {
		$("#activityDateLabel").show();
		$("#activityDate").show();
		$("#horarioActividadLabel").show();
		$("#horarioActividad").show();
		$("#estadoActividadLabel").show();
		$("#estadoActividad").show();
	}
}