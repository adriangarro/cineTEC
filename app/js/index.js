/*
	+----------------------------------------
	project: cineTEC
	-----------------------------------------
	file: index.js
	-----------------------------------------
	author: Elberth Adrian Garro Sanchez
	----------------------------------------+
*/

//-----------------------------------
// connect to firebase
var config = {
	apiKey: "AIzaSyBPFPZngjPBsG38peTcXUP8rWA8QnrUanQ",
	authDomain: "cinetec-b2a0f.firebaseapp.com",
	databaseURL: "https://cinetec-b2a0f.firebaseio.com",
	projectId: "cinetec-b2a0f",
	storageBucket: "cinetec-b2a0f.appspot.com",
	messagingSenderId: "171738294119"
};
firebase.initializeApp(config);
//-----------------------------------

function showDates() {
	$("#selectDate").pickadate({
		//-----------------------------------
		monthsFull: [
			"enero", "febrero", "marzo", "abril", 
			"mayo", "junio", "julio", "agosto", 
			"septiembre", "octubre", "noviembre", "diciembre"
		],
		monthsShort: [
			"ene", "feb", "mar", "abr", 
			"may", "jun", "jul", "ago", 
			"sep", "oct", "nov", "dic"
		],
		weekdaysFull: [
			"domingo", "lunes", "martes", "miércoles", 
			"jueves", "viernes", "sábado"
		],
		weekdaysShort: [
			"dom", "lun", "mar", 
			"mié", "jue", "vie", "sáb"
		],
		today: "hoy",
		clear: "borrar",
		close: "cerrar",
		firstDay: 1,
		format: "dddd d !de mmmm !de yyyy",
		formatSubmit: "yyyy/mm/dd",
		min: [2017,6-1,22],
		//-----------------------------------
	});
}

function showCountries() {
	$("#selectDate")
		.change(function() {
			//-----------------------------------
			// clean form
			$("#selectCountry")
				.html("");
			$("#selectBranch")
				.html("");
			$("#selectRoomType")
				.html("");
			//-----------------------------------
			// if user select date		
			if ($(this).val()) {
				//-----------------------------------
				// adding dummy option
				$("<option disabled selected value>País</option>")
					.appendTo("#selectCountry");
				//-----------------------------------
				// create a new connection to firebase
				var refCountries = firebase
					.database()
					.ref("countries")
					.orderByKey();
				//-----------------------------------
				// listen to data updates from firebase
				refCountries.once("value")
					.then(function (snapshot) {
						snapshot
							.forEach(function (childSnapshot) {
								//-----------------------------------
								var countryKey = childSnapshot.key;
								var countryData = childSnapshot.val();
								var countryOption = "<option value=" 
									+ countryKey 
									+ ">" 
									+ countryData.name 
									+ "</option>";
								//-----------------------------------
								$(countryOption)
									.appendTo("#selectCountry");
								//-----------------------------------
							});
					});
			}
		});
}

function showBranches() {
	$("#selectCountry")
		.change(function() {
			//----------------------------------------------
			// clean branch options
			$("#selectBranch")
				.html("");
			//----------------------------------------------
			// adding dummy option
			$("<option disabled selected value>Sucursal</option>")
				.appendTo("#selectBranch");
			//----------------------------------------------
			// clean room type options	
			$("#selectRoomType")
				.html("");
			//----------------------------------------------
			// adding dummy option
			$("<option disabled selected value>Tipo de Sala</option>")
			//----------------------------------------------
			// preparing path
			var branchesPath = "branches/";
			//----------------------------------------------
			$("#selectCountry option:selected")
				.each(function() {
					//----------------------------------------------
					// completing path
					branchesPath += $(this).val();
					//----------------------------------------------
					// create a new connection to firebase
					var refBranches = firebase
						.database()
						.ref(branchesPath)
						.orderByKey();
					//----------------------------------------------
					// listen to data updates from firebase	
					refBranches.once("value")
						.then(function (snapshot) {
							snapshot
								.forEach(function (childSnapshot) {
									//-----------------------------------
									var branchKey = childSnapshot.key;
									var branchData = childSnapshot.val();
									var branchOption = "<option value=" 
										+ branchKey 
										+ ">" 
										+ branchData.name 
										+ "</option>";
									//-----------------------------------
									$(branchOption)
										.appendTo("#selectBranch");
									//-----------------------------------
								});
						});
				});
		});
}

function showRoomTypes() {
	$("#selectBranch")
		.change(function () {
			//----------------------------------------------
			// clean room type options
			$("#selectRoomType")
				.html("");
			//----------------------------------------------
			// adding dummy option
			$("<option disabled selected value>Tipo de Sala</option>")
				.appendTo("#selectRoomType");
			//----------------------------------------------
			// create a new connection to firebase
			var refRoomTypes = firebase
				.database()
				.ref("roomtypes")
				.orderByKey();
			//----------------------------------------------
			// listen to data updates from firebase
			refRoomTypes.once("value")
				.then(function (snapshot) {
					snapshot
						.forEach(function (childSnapshot) {
							//----------------------------------------------
							var roomTypeKey = childSnapshot.key;
							var roomTypeData = childSnapshot.val();
							var roomTypeOption = "<option value=" 
								+ roomTypeKey 
								+ ">" 
								+ roomTypeData.name 
								+ "</option>";
							//----------------------------------------------
							$(roomTypeOption)
								.appendTo("#selectRoomType");
							//----------------------------------------------
						});
				});
		});
}

function consultListings() {
	$("#consultButton")
		.click(function () {
			//----------------------------------------------------------
			var date = $("#selectDate").val();
			var countryKey = $("#selectCountry").val();
			var branchKey = $("#selectBranch").val();
			var branch = $("#selectBranch option:selected").text();
			var roomTypeKey = $("#selectRoomType").val();
			var roomType = $("#selectRoomType option:selected").text();
			//----------------------------------------------------------
			if (date === ""
				|| countryKey === null 
				|| branchKey === null 
				|| roomTypeKey === null) {
					//----------------------------------------------
					sweetAlert("Uups...", 
						"¡No has seleccionado todos los datos!", 
						"error"
					);
					//----------------------------------------------
			} else {
				//---------------------------------------------------
				var input = $("#selectDate").pickadate();
				var picker = input.pickadate("picker");
				var dateISO = picker.get("select", "yyyy-mm-dd");
				localStorage.setItem("dateISO", 
					dateISO
				);
				//---------------------------------------------------
				localStorage.setItem("date", 
					date
				);
				//----------------------------------------------
				localStorage.setItem("countryKey", 
					countryKey
				);
				//----------------------------------------------
				localStorage.setItem("branchKey", 
					branchKey
				);
				//----------------------------------------------
				localStorage.setItem("branch", 
					branch
				);
				//----------------------------------------------
				localStorage.setItem("roomTypeKey", 
					roomTypeKey
				);
				//----------------------------------------------
				localStorage.setItem("roomType", 
					roomType
				);
				//----------------------------------------------
				window.location.href = "billboard.html";
				//----------------------------------------------
			}
		});
}

jQuery(
	showDates(),
	showCountries(),
	showBranches(),
	showRoomTypes(),
	consultListings()
);

