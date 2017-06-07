/**
* consultaEventos.js: Funcionalidades para la pagina de consulta de eventos
* Autor: Víctor Andrés Chaves Díaz
*/

$(document).ready(function() {
	$("#eventsImage").hide();
	$("#eventsImage").fadeIn(1000);

	// Tabla de muestra
	var eventTable = $('#eventSearchTable').DataTable({
		"paging":   false,
        "ordering": false,
        "info":     false
	});
	
	// Buscar por nombre
	$('#eventNameInput').on('input propertychange paste', function() {
		var eventName = $(this).val();
		if (eventName != "") {
			// Ojo, hay que finolear esta busqueda: como hacer que lea de la primera letra?
			eventTable.column(0).search("( )?" + eventName, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			eventTable.search('').columns().search('').draw();
		}
	});

	// Fecha
	$('#eventDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

	$('#eventDateInput').on('change', function() {
		var eventDate = $(this).val();
		console.log(eventDate);
		if (eventDate != "") {
			eventTable.column(1).search(eventDate, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			eventTable.search('').columns().search('').draw();
		}
	});

	// Hora
	$('#eventTimeInput').daterangepicker({
		singleDatePicker: true,
		timePicker: true,
        locale: {
            format: 'h:mm A'
        }
	});
	
	$('#eventTimeInput').on('change', function() {
		var eventTime = $(this).val();
		console.log(eventTime);
		if (eventTime != "") {
			eventTable.column(2).search(eventTime).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			eventTable.search('').columns().search('').draw();
		}
	});
	
});