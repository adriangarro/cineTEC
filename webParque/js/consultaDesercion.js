$(document).ready(function() {
	// Tabla de personas por desercion
	var coursesDesertionTable = $('#coursesDesertionTable').DataTable({
		"paging":   false,
        "ordering": false,
        "info":     false
	});
	
	// Buscar por país
	$('#desertionCoursesList').on('change', function() {
		var courseSelection = $(this).val();
		if (courseSelection == "none" || courseSelection == "Todos") {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			coursesDesertionTable.search( '' ).columns().search( '' ).draw();
		} else {
			coursesDesertionTable.column(4).search(courseSelection).draw();
		}
	});
});