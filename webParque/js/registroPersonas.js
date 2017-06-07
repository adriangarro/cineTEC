/*registroPersonas.js -> Código JavaScript para registroPersonas.html
*
*Autor: Kevin Lobo Chinchilla
*/

$(document).ready(function(){
	// Se inicializan algunos 
	$("#inputFileDiv").hide();
	$("#employeePositionDiv").hide();
	$("#peopleDogs").hide();
	$("#peopleDogs").fadeIn(1000);


	$('#entryDate').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});
});

function showFileInput(type){
	var personType = document.getElementById(type);
	var form = document.getElementById('personForm');
	if (personType.value == "Empleado"){
		$("#inputFileDiv").show();
		$("#employeePositionDiv").show();
	} else if (personType.value == "Estudiante"){
		$("#inputFileDiv").hide();
		$("#employeePositionDiv").hide();
	} else if (personType.value == "Visitante"){
		$("#inputFileDiv").hide();
		$("#employeePositionDiv").hide();
	}
}