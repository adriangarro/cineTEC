/**
* consultaPersona.js: Funcionalidades para la pagina de consulta de personas
* Autor: Víctor Andrés Chaves Díaz
*/

$(document).ready(function() {
	$("#coursesImage").hide();
	$("#coursesImage").fadeIn(1000);
	
	$('#IDNumber').hide();
	$('#IDNumberLabel').hide();
	
	$('#entryDateLabel').hide();
	$('#exitDateLabel').hide();
	$('#hireDateLabel').hide();

	$('#entryDateInput').hide();
	$('#exitDateInput').hide();
	$('#hireDateInput').hide();

	if (!Modernizr.inputtypes.date) {
    	$('input[type=date]').datepicker({        	
        	dateFormat: 'yy-mm-dd'
    	});
	}

	
	var peopleTable = $('#peopleSearchTable').DataTable({
		"paging":   false,
        "ordering": false,
        "info":     false
	});
	
	$('#personFirstName').on('input propertychange paste', function() {
		var firstName = $(this).val();
		console.log(firstName);
		if (firstName != "") {
			// Ojo, hay que finolear esta busqueda: como hacer que lea de la primera letra?
			peopleTable.column(0).search("( )?" + firstName, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			peopleTable.search('').columns().search('').draw();
		}
	});
	
	$('#personLastName').on('input propertychange paste', function() {
		var lastName = $(this).val();
		console.log(lastName);
		if (lastName != "") {
			peopleTable.column(1).search("( )?" + lastName, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			peopleTable.search('').columns().search('').draw();
		}
	});
	
	$('#IdType').on('change', function() {
		var IDSelection = $(this).val();
		if (IDSelection == "none") {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			peopleTable.search( '' ).columns().search( '' ).draw();
			$('#IDNumber').hide();
			$('#IDNumberLabel').hide();
		} else {
			peopleTable.column(2).search(IDSelection).draw();
			$('#IDNumber').show();
			$('#IDNumberLabel').show();
		}
	});
	
	$('#IDNumber').on('input propertychange paste', function() {
		var idNumber = $(this).val();
		if (idNumber != "") {
			peopleTable.column(3).search("^" + idNumber, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			peopleTable.search('').columns().search('').draw();
		}
	});

	$('#personType').on('change', function() {
		var personType = $(this).val();
		if (personType == 'Estudiante' || personType == 'Visitante') {
			$('#entryDateLabel').show();
			$('#exitDateLabel').show();
			$('#hireDateLabel').hide();

			$('#entryDateInput').show();
			$('#exitDateInput').show();
			$('#hireDateInput').hide();
			
			peopleTable.column(5).search(personType).draw();

		} else if (personType == 'Empleado') {
			$('#entryDateLabel').hide();
			$('#exitDateLabel').hide();
			$('#hireDateLabel').show();

			$('#entryDateInput').hide();
			$('#exitDateInput').hide();
			$('#hireDateInput').show();

			peopleTable.column(5).search(personType).draw();

		} else {
			$('#entryDateLabel').hide();
			$('#exitDateLabel').hide();
			$('#hireDateLabel').hide();

			$('#entryDateInput').hide();
			$('#exitDateInput').hide();
			$('#hireDateInput').hide();

			peopleTable.search('').columns().search('').draw();
		}
	});

	// TODO: Arreglar el cambio de fecha
	// Fecha de entrada (no empleados)
	$('#entryDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

	$('#entryDateInput').on('change', function() {
		filterByDate(6, $(this).val(), false);
        peopleTable.draw();
    });
	
	// Fecha de salida (no empleados)
	$('#exitDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

	$('#exitDateInput').on('change', function() {
		filterByDate(7, $(this).val(), true);
        peopleTable.draw();
	});

	// Fecha de entrada de empleados
	$('#hireDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

	$('#hireDateInput').on('change', function() {
		filterByDate(6, $(this).val(), false);
        peopleTable.draw();
	});
});

var filterByDate = function(column, inputDate, endDate) {
  		// Agregar esta función filtro a la busqueda
		$.fn.dataTableExt.afnFiltering.push(
		   	function(settings, data, dataIndex) {
		   		var rowDate = getDate(data[column]),
              	start = getDate(inputDate);

              	console.log(start.toGMTString());
          		
          		if (endDate) { 
          			// Si lo que necesitamos es revisar la fecha final
          			// Si lo que ocupamos es revisar es la fecha inicial
			        if (rowDate.getTime() <= start.getTime()) {
			        	return true;
			        } else {
			            return false;
			        }

          		} else {
			        // Si lo que ocupamos es revisar es la fecha inicial
			        if (start.getTime() <= rowDate.getTime()) {
			        	return true;
			        } else {
			            return false;
			        }
			    }
	        }
		);
	};

function getDate(dateString) {
	var dateParts = dateString.split("/");
	// Hay que pasar la fecha de DD/MM/YYYY a YYYY/MM/DD
	// Javascript cuenta meses desde 0
	var finalDate = new Date(parseInt(dateParts[2], 10),
                  			 parseInt(dateParts[1], 10) - 1,
                  			 parseInt(dateParts[0], 10));

	return finalDate;
}