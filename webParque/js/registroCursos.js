// Inicializamos el JQuery
$(document).ready(function(){
	// Se inicializan algunos 
	$("#coursesImage").hide();
	$("#coursesImage").fadeIn(1000);

	// Codigo para conectar el JQuery con DataTables de la tabla de estudiantes registrados
	// Esto se reemplazará por arrays de Javascript, una vez que se conecte con PHP y la base de datos
	var tablaEstudiantes = $('#tablaEstudiantes').DataTable({
		language:{
			search: "Buscar"
		},
		"paging":   false,
        "ordering": false,
        "info":     false
	});
 
    $('#tablaEstudiantes tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    });

    $('#beginDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

    $('#endDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});
});