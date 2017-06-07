/*
    editarCursos.js: Código JS para la pagina para editar y actualizar los cursos
    Autor: Victor Chaves Diaz
*/
// Inicializamos el JQuery
$(document).ready(function(){
	// Se inicializan algunos 
	$("#coursesImage").hide();
	$("#coursesImage").fadeIn(1000);

	$('#institucion').hide();
	$('#nombreCurso').hide();
	$('#costoCurso').hide();
	$('#mercado').hide();
	$('#fechaInicio').hide();
	$('#fechaFinal').hide();
	$('#horario').hide();
	$('#tablaEstudiantesDiv').hide();
	$('#submitCourseChanges').hide();

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

	$('#courseNameInput').on('change', function() {
		if($(this).val() == "Baile contemporaneo") {
			$('#selectCourse').hide();
			$('#institucion').show();
			$('#nombreCurso').show();
			$('#costoCurso').show();
			$('#mercado').show();
			$('#fechaInicio').show();
			$('#fechaFinal').show();
			$('#horario').show();
			$('#tablaEstudiantesDiv').show();
			$('#submitCourseChanges').show();
		}
	});
});