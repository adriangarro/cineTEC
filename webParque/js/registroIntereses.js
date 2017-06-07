/**
* registroIntereses.js: Funcionalidades para la pagina de registro de Persona en Actividad
* Autor: Kevin Lobo Chinchilla
*/

$(document).ready(function() {
	$('#activeActivities').hide();
	$("#personName").hide();
	$('#submitPersonActivity').hide();

	$("#searchPerson").on('click', function(){
		$('#searchPerson').hide();
		$('#inputPersonID').hide();
		$('#personName').show();
		$('#activeActivities').show();
		$('#submitPersonActivity').show();
	});
});