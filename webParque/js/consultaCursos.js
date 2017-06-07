$(document).ready(function() {
	var courseTable = $('#courseSearchTable').DataTable({
		"paging":   false,
        "ordering": false,
        "info":     false
	});

	$('#courseNameInput').on('input propertychange paste', function() {
		var courseName = $(this).val();
		if (courseName != "") {
			// Ojo, hay que finolear esta busqueda: como hacer que lea de la primera letra?
			courseTable.column(0).search("( )?" + courseName, true).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			courseTable.search('').columns().search('').draw();
		}
	});

	
	$('#courseSchedulesList').on('change', function() {
		var courseSchedule = $(this).val();
		if (courseSchedule != "none") {
			courseTable.column(1).search(courseSchedule).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			courseTable.search('').columns().search('').draw();
		}
	});

	
	$('#courseDateInput').daterangepicker({
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});
	
	$('#courseDateInput').on('change', function() {
		var courseDate = $(this).val();
		if (courseDate != "") {
			courseTable.column(2).search(courseDate).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			courseTable.search('').columns().search('').draw();
		}
	});

	$('#courseCostInput').on('input propertychange paste', function() {
		var courseCost = $(this).val();
		if (courseCost != "") {
			courseTable.column(3).search("₡" + courseCost).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			courseTable.search('').columns().search('').draw();
		}
	});

	$('#courseMarketList').on('change', function() {
		var courseMarket = $(this).val();
		if (courseMarket != "none") {
			courseTable.column(4).search(courseMarket).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			courseTable.search('').columns().search('').draw();
		}
	});
}); 