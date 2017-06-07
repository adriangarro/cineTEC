$(document).ready(function(){
	$("#provinciaInput").hide();
	$("#cantonInput").hide();
	$("#distritoInput").hide();
	$("#employeesQuant").hide();
	$("#peopleQuant").hide();
	$("#top10Person").hide();
	$("#top5Activities").hide();
	$("#to5DemandCourses").hide();
	$("#top5DesertionCourses").hide();
});

function showFileInput(type){
	var data = document.getElementById(type);
	var form = document.getElementById("statisticsForm");
	if (data.value == "Cantidad de empleados"){
		$("#provinciaInput").hide();
		$("#cantonInput").hide();
		$("#distritoInput").hide();
		$("#employeesQuant").show();
		$("#peopleQuant").hide();
		$("#top10Person").hide();
		$("#top5Activities").hide();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").hide();
	} else if (data.value == "Cantidad de personas registradas por provincia") {
		$("#provinciaInput").show();
		$("#cantonInput").hide();
		$("#distritoInput").hide();
		$("#employeesQuant").hide();
		$("#peopleQuant").show();
		$("#top10Person").hide();
		$("#top5Activities").hide();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").hide();
	} else if (data.value == "Cantidad de personas registradas por cantón") {
		$("#provinciaInput").show();
		$("#cantonInput").show();
		$("#distritoInput").hide();
		$("#employeesQuant").hide();
		$("#peopleQuant").show();
		$("#top10Person").hide();
		$("#top5Activities").hide();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").hide();
	} else if (data.value == "Cantidad de personas registradas por distrito") {
		$("#provinciaInput").show();
		$("#cantonInput").show();
		$("#distritoInput").show();
		$("#employeesQuant").hide();
		$("#peopleQuant").show();
		$("#top10Person").hide();
		$("#top5Activities").hide();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").hide();
	} else if (data.value == "Top 10 personas con más visitas") {
		$("#provinciaInput").hide();
		$("#cantonInput").hide();
		$("#distritoInput").hide();
		$("#employeesQuant").hide();
		$("#peopleQuant").hide();
		$("#top10Person").show();
		$("#top5Activities").hide();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").hide();
	} else if (data.value == "Top 5 actividades con más demanda") {
		$("#provinciaInput").hide();
		$("#cantonInput").hide();
		$("#distritoInput").hide();
		$("#employeesQuant").hide();
		$("#peopleQuant").hide();
		$("#top10Person").hide();
		$("#top5Activities").show();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").hide();
	} else if (data.value == "Top 5 cursos con más demanda") {
		$("#provinciaInput").hide();
		$("#cantonInput").hide();
		$("#distritoInput").hide();
		$("#employeesQuant").hide();
		$("#peopleQuant").hide();
		$("#top10Person").hide();
		$("#top5Activities").hide();
		$("#to5DemandCourses").show();
		$("#top5DesertionCourses").hide();
	}
	else if (data.value == "Top 5 cursos con más deserciones") {
		$("#provinciaInput").hide();
		$("#cantonInput").hide();
		$("#distritoInput").hide();
		$("#employeesQuant").hide();
		$("#peopleQuant").hide();
		$("#top10Person").hide();
		$("#top5Activities").hide();
		$("#to5DemandCourses").hide();
		$("#top5DesertionCourses").show();
	}
}
