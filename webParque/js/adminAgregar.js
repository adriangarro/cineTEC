$(document).ready(function(){
	// Se inicializan algunos 
	$("#newData").hide();
	$("#newInstName").hide();
	$("#institutionDirDiv").hide();
	$("#dirOptionsDiv").hide();
	$("#availableCountriesDiv").hide();
	$("#availableProvDiv").hide();
	$("#availableCantDiv").hide();
	$("#newDirDataDiv").hide();

	$("#availableCatalogs").on('change', function(){
		var value = $(this).val();
		$("#newData").hide();
		$("#newInstName").hide();
		$("#institutionDirDiv").hide();
		$("#dirOptionsDiv").hide();
		$("#availableCountriesDiv").hide();
		$("#availableProvDiv").hide();
		$("#availableCantDiv").hide();
		$("#newDirDataDiv").hide();
		if (value == "none") {
			$("#newData").hide();
			$("#newInstName").hide();
			$("#institutionDirDiv").hide();
			$("#dirOptionsDiv").hide();
		} else if (value == "inst") {
			$("#newInstName").show();
			$("#institutionDirDiv").show();
		} else if (value == "dir"){
			$("#dirOptionsDiv").show();
		} else {
			$("#newData").show();
		}
	});

	$("#dirOptions").on('change', function(){
		var option = $(this).val();
		$("#availableCountriesDiv").hide();
		$("#availableProvDiv").hide();
		$("#availableCantDiv").hide();
		$("#newDirDataDiv").hide();
		if (option == "none"){
			$("#availableCountriesDiv").hide();
			$("#availableProvDiv").hide();
			$("#availableCantDiv").hide();
			$("#newDirDataDiv").hide();
		} else if (option == "pais"){
			$("#newDirDataDiv").show();
		} else if (option == "prov"){
			$("#availableCountriesDiv").show();
			$("#newDirDataDiv").show();
		} else if (option == "cant"){
			$("#availableProvDiv").show();
			$("#newDirDataDiv").show();
		} else if (option == "dist"){
			$("#availableCantDiv").show();
			$("#newDirDataDiv").show();
		}
	});
});