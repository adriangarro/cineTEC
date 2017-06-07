$(document).ready(function(){
	// Se inicializan algunos 
	$("#personName").hide();
	$("#reentryDateDiv").hide();
	$("#submitPersonReentry").hide();

	$("#searchPerson").on('click', function(){
		$('#idNumDiv').hide();
		$('#buttonSearchDiv').hide();

		$("#personName").show();
		$("#reentryDateDiv").show();
		$("#submitPersonReentry").show();

	});

	$('#reentryDate').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
	});
});
