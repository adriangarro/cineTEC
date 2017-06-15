/*
    +----------------------------------------
    project: cineTEC
    -----------------------------------------
    file: index.js
    -----------------------------------------
    author: Elberth Adrian Garro Sanchez
    ----------------------------------------+
*/

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

function hideBillboard() {
    $("#billboard").hide();
}
function showBillboard() {
    $("#billboard").show();
}

function showDates() {
    $("#selectDate").pickadate({
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
    });
}

function showCountries() {
    $("#selectDate").change(function() {
        hideBillboard();
        // clean form
        $("#selectCountry").html("");
        $("#selectBranch").html("");
        $("#selectRoomType").html("");
        // if user select date		
        if ($(this).val()) {
            // adding dummy option
            $("<option disabled selected value>País</option>")
                .appendTo("#selectCountry");
            // create a new connection to firebase
            var refCountries = firebase
                .database()
                .ref("countries")
                .orderByKey();
            // listen to data updates from firebase
            refCountries.once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var countryKey = childSnapshot.key;
                    var countryData = childSnapshot.val();
                    var countryOption = "<option value=" 
                        + countryKey 
                        + ">" 
                        + countryData.name 
                        + "</option>";
                    $(countryOption).appendTo("#selectCountry");
                });
            });
        }
    });
}

function showBranches() {
    $("#selectCountry").change(function() {
        hideBillboard();
        // clean branch options
        $("#selectBranch").html("");
        // adding dummy option
        $("<option disabled selected value>Sucursal</option>")
            .appendTo("#selectBranch");
        // clean room type options	
        $("#selectRoomType").html("");
        // adding dummy option
        $("<option disabled selected value>Tipo de Sala</option>")
        // preparing path
        var branchesPath = "branches/";
        $("#selectCountry option:selected").each(function() {
            // completing path
            branchesPath += $(this).val();
            // create a new connection to firebase
            var refBranches = firebase
                .database()
                .ref(branchesPath)
                .orderByKey();
            // listen to data updates from firebase	
            refBranches.once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var branchKey = childSnapshot.key;
                    var branchData = childSnapshot.val();
                    var branchOption = "<option value=" 
                        + branchKey 
                        + ">" 
                        + branchData.name 
                        + "</option>";
                    $(branchOption)
                        .appendTo("#selectBranch");
                });
            });
        });
    });
}

function showRoomTypes() {
    $("#selectBranch").change(function () {
        hideBillboard();
        // clean room type options
        $("#selectRoomType").html("");
        // adding dummy option
        $("<option disabled selected value>Tipo de Sala</option>")
            .appendTo("#selectRoomType");
        // create a new connection to firebase
        var refRoomTypes = firebase
            .database()
            .ref("roomtypes")
            .orderByKey();
        // listen to data updates from firebase
        refRoomTypes.once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var roomTypeKey = childSnapshot.key;
                var roomTypeData = childSnapshot.val();
                var roomTypeOption = "<option value=" 
                    + roomTypeKey 
                    + ">" 
                    + roomTypeData.name 
                    + "</option>";
                $(roomTypeOption)
                    .appendTo("#selectRoomType");
            });
        });
    });
}

function hideBillboardIfChangeRoomTypes() {
    $("#selectRoomType").change(function() {
        hideBillboard();
    });
}

function consultBranch() {
    $("#consultButton").click(function () {
        var date = $("#selectDate").val();
        var countryKey = $("#selectCountry").val();
        var branchKey = $("#selectBranch").val();
        var roomTypeKey = $("#selectRoomType").val();
        if (date===""|| countryKey===null||branchKey===null||roomTypeKey===null) {
            //hideBillboard();
            sweetAlert("Uups...", "¡No has seleccionado todos los datos!", "error");
        } else {
            // set billboard title
            var input = $("#selectDate").pickadate();
            var picker = input.pickadate("picker");
            var dateISO = picker.get("select", "yyyy-mm-dd");
            $("#dateLabel").text("Presentando el " + date + ":");
            // show billboard details
            var branch = $("#selectBranch option:selected").text();
             $("#branchLabel").text(branch);
            var roomType = $("#selectRoomType option:selected").text();
            $("#roomTypeLabel").text("Salas " + roomType);
            // query billboards preferences
            // first, know if exist shows in that branch
            var refShows = firebase.database().ref("shows/" + branchKey);
            refShows.once("value").then(function(snapshot) {
                var thereShowsinBranch = snapshot.exists();
                if (thereShowsinBranch) {
                    // second, get the shows
                    refShows.once("value").then(function (snapshotShow) {
                        snapshotShow.forEach(function (childSnapshotShow) {
                            // third, check if shows
                            // have the selected date
                            if (childSnapshotShow.child("dateISO").val() === dateISO) {
                                // fourth, now get room type picked
                                var refRoom = firebase.database()
                                    .ref("rooms/" 
                                        + branchKey
                                        + "/" 
                                        + childSnapshotShow.child("roomID").val()
                                    );
                                // fith, have show the room type chosen?
                                refRoom.once("value").then(function (snapshotRoom) {
                                    if (snapshotRoom.child("roomtypeID").val() == roomTypeKey) {
                                        
                                        var storage = firebase.storage();
                                        var storageRef = storage.ref();
                                        var movieRef = storageRef.child("img/deadpool.jpg");
                                        movieRef.getDownloadURL().then(function(url) {
                                            document.querySelector("#movieImg").src = url;
                                        });
                                        
                                        
                                        showBillboard();
                                        // scroll to billboard
                                        $("html, body")
                                            .animate({scrollTop: $("#billboard").offset().top}, "slow");
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
        // give user info about why 
        // billboard doesn't show
        setTimeout(function (){
            if ($("#billboard").is(":hidden")) {
                swal(
                    "Uups...", 
                    "¡En este momento no tenemos películas con sus preferencias!", 
                    "error"
                );
            }
        }, 500);
    // consultButton click  
    });
}

jQuery(
    hideBillboard(),
    showDates(),
    showCountries(),
    showBranches(),
    showRoomTypes(),
    hideBillboardIfChangeRoomTypes(),
    consultBranch()
)
