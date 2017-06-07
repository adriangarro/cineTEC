/**
* registroIntereses.js: Funcionalidades para la pagina de edición de personas
* Autor: Victor Chaves Diaz
*/

$(document).ready(function() {
	$('#entryDateLabel, #entryDateInput').hide();
	$('#firstNameLabel, #firstNameInput').hide();
	$('#lastNameLabel, #lastNameInput').hide();
	$('#personTypeLabel, #personTypeInput').hide();
	$("#inputFileDiv").hide();
	$("#employeePositionDiv").hide();
	$('#oldAdminPasswordDiv').hide();
	$('#newAdminPasswordDiv').hide();
	$('#IdTypeLabel, #IdTypeInput').hide();
	$('#IDNumLabel, #IDNumInput').hide();
	$('#addressLabel').hide();
	$('#countryLabel').hide();
	$('#provinceLabel').hide();
	$('#cantonLabel').hide();
	$('#districtLabel').hide();
	$('#extraAddressLabel, #extraAddressInput').hide();
	$('#nationalityLabel, #nationalityInput').hide();
	$('#submitPersonChanges').hide();

	$("#peopleDogs").hide();
	$("#peopleDogs").fadeIn(1000);


	$('#entryDateInput').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});

	$("#searchPerson").on('click', function(){
		$('#IDInputLabel').hide();
		$('#IDInputSearch').hide();
		$('#searchPerson').hide();

		$('#entryDateLabel, #entryDateInput').show();
		$('#firstNameLabel, #firstNameInput').show();
		$('#lastNameLabel, #lastNameInput').show();
		$('#personTypeLabel, #personTypeInput').show();
		$('#IdTypeLabel, #IdTypeInput').show();
		$('#IDNumLabel, #IDNumInput').show();
		$('#addressLabel').show();
		$('#countryLabel').show();
		$('#provinceLabel').show();
		$('#cantonLabel').show();
		$('#districtLabel').show();
		$('#extraAddressLabel, #extraAddressInput').show();
		$('#nationalityLabel, #nationalityInput').show();
		$('#submitPersonChanges').show();
	});

	$('#positionInput').on('change', function() {
		if($(this).val() == "Administrador") {
			$('#oldAdminPasswordDiv').show();
			$('#newAdminPasswordDiv').show();
		} else {
			$('#oldAdminPasswordDiv').hide();
			$('#newAdminPasswordDiv').hide();
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