/**
* registroDeserciones.js: Funcionalidades para la pagina de registro de deserciones
* Autor: Kevin Lobo Chinchilla
*/

$(document).ready(function() {

	$('#studentCourses').hide();

	$('#desertionPeriod').hide();

	$('#desertionReason').hide();

	$("#searchCourses").hide();

	$("#studentName").hide();

	$("#submitDesertion").hide();

	$("#searchStudent").on('click', function(){
		$('#studentName').show();
		$('#studentCourses').show();
		$("#submitDesertion").show();
		$('#searchButton').hide();
		$('#inputStudentID').hide();

	});

    $("#studentActiveCourses").on('change', function(){
    	$('#desertionPeriod').show();
		$('#desertionReason').show();

    });
});