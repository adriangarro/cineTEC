/**
* Autor original: Kevin Josué Lobo Chinchilla
* Co-autores: Victor Andres Chaves Diaz
*/

// Inicializamos el JQuery
$(document).ready(function(){
	$('#provinceLocatonLabel, #provinceLocatonList').hide();
	$('#SJCantonLabel, #SJCantonList').hide();
	$('#SJDistrictLabel, #SJDistrictList').hide();
	$('#AserriDistrictLabel, #AserriDistrictList').hide();

	$('#HerediaCantonLabel, #HerediaCantonList').hide();
	$('#SDDistrictLabel, #SDDistrictList').hide();
	$('#SPDistrictLabel, #SPDistrictList').hide();

	// Tabla de personas por ubicacion
	var tablaPersonaUbicacion = $('#tablaPersonasUbicacion').DataTable({
		"paging":   false,
        "ordering": false,
        "info":     false
	});
	
	// Buscar por país
	$('#countryLocationList').on('change', function() {
		var countrySelect = $(this).val();
		if (countrySelect != "none") {
			tablaPersonaUbicacion.column(2).search(countrySelect).draw();
			$('#provinceLocatonLabel, #provinceLocatonList').show();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' ).draw();
			$('#provinceLocatonLabel, #provinceLocatonList').hide();
			$('#SJCantonLabel, #SJCantonList').hide();
			$('#SJDistrictLabel, #SJDistrictList').hide();
			$('#AserriDistrictLabel, #AserriDistrictList').hide();

			$('#HerediaCantonLabel, #HerediaCantonList').hide();
			$('#SDDistrictLabel, #SDDistrictList').hide();
			$('#SPDistrictLabel, #SPDistrictList').hide();
		}
	});
	
	// Buscar por provincia
	$('#provinceLocatonList').on('change', function() {
		
		var provinceSelect = $(this).val();
		if (provinceSelect != "none") {
			
			// Volvemos a hacer la busqueda en la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(2).search($('#countryLocationList').val());
			tablaPersonaUbicacion.column(3).search(provinceSelect).draw();

			if(provinceSelect == "San José") {
				$('#SJCantonLabel, #SJCantonList').show();
				$('#SJDistrictLabel, #SJDistrictList').hide();
				$('#AserriDistrictLabel, #AserriDistrictList').hide();

				$('#HerediaCantonLabel, #HerediaCantonList').hide();
				$('#SDDistrictLabel, #SDDistrictList').hide();
				$('#SPDistrictLabel, #SPDistrictList').hide();
			} else {
				$('#SJCantonLabel, #SJCantonList').hide();
				$('#SJDistrictLabel, #SJDistrictList').hide();
				$('#AserriDistrictLabel, #AserriDistrictList').hide();

				$('#HerediaCantonLabel, #HerediaCantonList').show();
				$('#SDDistrictLabel, #SDDistrictList').hide();
				$('#SPDistrictLabel, #SPDistrictList').hide();
			}

		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' ).draw();
			$('#SJCantonLabel, #SJCantonList').hide();
			$('#SJDistrictLabel, #SJDistrictList').hide();
			$('#AserriDistrictLabel, #AserriDistrictList').hide();

			$('#HerediaCantonLabel, #HerediaCantonList').hide();
			$('#SDDistrictLabel, #SDDistrictList').hide();
			$('#SPDistrictLabel, #SPDistrictList').hide();
		}
	});
	
	// Buscar en los cantones de San José
	$('#SJCantonList').on('change', function() {
		var SJCantonSelect = $(this).val();

		if (SJCantonSelect != "none") {
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(2).search($('#countryLocationList').val());
			tablaPersonaUbicacion.column(3).search($('#provinceLocatonList').val());
			tablaPersonaUbicacion.column(4).search(SJCantonSelect).draw();

			if(SJCantonSelect == "San José") {
				$('#SJDistrictLabel, #SJDistrictList').show();
				$('#AserriDistrictLabel, #AserriDistrictList').hide();

				$('#HerediaCantonLabel, #HerediaCantonList').hide();
				$('#SDDistrictLabel, #SDDistrictList').hide();
				$('#SPDistrictLabel, #SPDistrictList').hide();
			} else {
				$('#SJDistrictLabel, #SJDistrictList').hide();
				$('#AserriDistrictLabel, #AserriDistrictList').show();

				$('#HerediaCantonLabel, #HerediaCantonList').hide();
				$('#SDDistrictLabel, #SDDistrictList').hide();
				$('#SPDistrictLabel, #SPDistrictList').hide();
			}
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(3).search($('#provinceLocatonList').val()).draw();

			$('#SJDistrictLabel, #SJDistrictList').hide();
			$('#AserriDistrictLabel, #AserriDistrictList').hide();
		}
	});

	$('#SJDistrictList').on('change', function() {
		var SJDistrictSelect = $(this).val();
		if (SJDistrictSelect != "none") {
			tablaPersonaUbicacion.column(5).search(SJDistrictSelect).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(4).search($('#SJCantonList').val()).draw();
		}
	});

	$('#AserriDistrictList').on('change', function() {
		var AserriDistrictSelect = $(this).val();
		if (AserriDistrictSelect != "none") {
			tablaPersonaUbicacion.column(5).search(AserriDistrictSelect).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(4).search($('#SJCantonList').val()).draw();
		}
	});



	$('#HerediaCantonList').on('change', function() {
		var HerediaCantonSelect = $(this).val();

		if (HerediaCantonSelect != "none") {
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(2).search($('#countryLocationList').val());
			tablaPersonaUbicacion.column(3).search($('#provinceLocatonList').val());
			tablaPersonaUbicacion.column(4).search(HerediaCantonSelect).draw();

			if(HerediaCantonSelect == "San Pablo") {
				$('#SJCantonLabel, #SJCantonList').hide();
				$('#SJDistrictLabel, #SJDistrictList').hide();
				$('#AserriDistrictLabel, #AserriDistrictList').hide();

				$('#SDDistrictLabel, #SDDistrictList').hide();
				$('#SPDistrictLabel, #SPDistrictList').show();
			} else {
				$('#SJCantonLabel, #SJCantonList').hide();
				$('#SJDistrictLabel, #SJDistrictList').hide();
				$('#AserriDistrictLabel, #AserriDistrictList').hide();

				$('#SDDistrictLabel, #SDDistrictList').show();
				$('#SPDistrictLabel, #SPDistrictList').hide();
			}
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(3).search($('#provinceLocatonList').val()).draw();

			$('#SDDistrictLabel, #SDDistrictList').hide();
			$('#SPDistrictLabel, #SPDistrictList').hide();
		}
	});

	$('#SDDistrictList').on('change', function() {
		var SDDistrictSelect = $(this).val();
		if (SDDistrictSelect != "none") {
			tablaPersonaUbicacion.column(5).search(SDDistrictSelect).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(4).search($('#HerediaCantonList').val()).draw();
		}
	});

	$('#SPDistrictList').on('change', function() {
		var SPDistrictSelect = $(this).val();
		if (SPDistrictSelect != "none") {
			tablaPersonaUbicacion.column(5).search(SPDistrictSelect).draw();
		} else {
			// Como nos devolvemos a la opción nula, volvemos a dibujar toda la tabla
			tablaPersonaUbicacion.search( '' ).columns().search( '' );
			tablaPersonaUbicacion.column(4).search($('#HerediaCantonList').val()).draw();
		}
	});
});