/**
* consultaActividades.js: Funcionalidades para la pagina de consulta de actividades
* Autor: Víctor Andrés Chaves Díaz
*/

$(document).ready(function() {
	$("#activitiesImage").hide();
	$("#activitiesImage").fadeIn(1000);
	
	var activityTable = $('#activitySearchTable').DataTable({
		"paging":   false,
        "ordering": false,
        "info":     false
	});
	
	$('#activityNameInput').on('input propertychange paste', function() {
		var activityName = $(this).val();
		if (activityName != "") {
			// Ojo, hay que finolear esta busqueda: como hacer que lea de la primera letra?
			activityTable.column(0).search("( )?" + activityName, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			activityTable.search('').columns().search('').draw();
		}
	});

	$('#activityDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

	$('#activityDateInput').on('change', function() {
		var activityDate = $(this).val();
		if (activityDate != "") {
			activityTable.column(1).search(activityDate, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			activityTable.search('').columns().search('').draw();
		}
	});
});