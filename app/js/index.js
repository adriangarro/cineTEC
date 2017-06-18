/*
    +----------------------------------------
    project: cineTEC, June 2017
    -----------------------------------------
    file: index.js
    -----------------------------------------
    author: Elberth Adrián Garro Sánchez
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
    // clean billboard
    $("#movieslistGroup").html("");
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
        //---------------------------------------------
        // get pref data from init form
        var date = $("#selectDate").val();
        var countryKey = $("#selectCountry").val();
        var branchKey = $("#selectBranch").val();
        var roomTypeKey = $("#selectRoomType").val();
        //---------------------------------------------
        if (date===""|| countryKey===null||branchKey===null||roomTypeKey===null) {
            swal(
                "Uups...", 
                "¡No has seleccionado todos los datos!", 
                "warning"
            );
        } else {
            createBillBoard();
        }
    });
}

function createBillBoard() {
    //---------------------------------------------
    // get pref data from init form
    var date = $("#selectDate").val();
    var branchKey = $("#selectBranch").val();
    var roomTypeKey = $("#selectRoomType").val();
    //---------------------------------------------
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
    // getting billboards preferences...
    // first, know if branch chosen exist in shows node
    var refShowsBranch = firebase.database().ref("shows/" + branchKey).orderByKey();
    refShowsBranch.once("value").then(function (snapshotBranch) {
        if (snapshotBranch.exists()) {
            // second, for every show from that branch
            snapshotBranch.forEach(function (childSnapshotShow) {
                // third, check if shows have the selected date
                if (childSnapshotShow.child("dateISO").val() === dateISO) {
                    // fourth, now get room type picked
                    var refRoom = firebase.database()
                        .ref("rooms/" 
                            + branchKey
                            + "/" 
                            + childSnapshotShow.child("roomKey").val()
                        );
                    // fifth, last step, have show the room type chosen?
                    refRoom.once("value").then(function (snapshotRoom) {
                        if (snapshotRoom.child("roomtypeKey").val() == roomTypeKey) {
                            // get show key
                            var showKey = childSnapshotShow.key
                            // get show hour
                            var showHour = childSnapshotShow.child("hourISO").val();
                            // get show capacity
                            var showCapacity = snapshotRoom.child("capacity").val();
                            // get show price
                            var showPrice = childSnapshotShow.child("price").val();
                            // get movie key
                            var movieKey = childSnapshotShow.child("movieKey").val();
                            // reference of movie
                            var movieRef = firebase.database().ref("movies/" + movieKey);
                            // listening firebase
                            movieRef.once("value").then(function (snapshotMovie) {
                                // create and insert list item in html 
                                // - if movie isn't in billboard
                                if ($(document).find("#item" + movieKey).length === 0) {
                                    // prepare list item string
                                    var listItem = '<div class="list-group-item"'
                                        + 'id="item' + movieKey +'"'
                                        + 'style="background-color:#222;'
                                        + 'height:250px;border:0"'
                                        + 'data-shows-hours=""'       // !
                                        + 'data-shows-prices=""'      // !
                                        + 'data-shows-capacities=""'  // !
                                        + '><div class="col-lg-3"><img src="'
                                        + snapshotMovie.child("image").val()
                                        + '"id="img' + movieKey + '"'
                                        + ' class="img-responsive"/>'
                                        + '</div><div class="col-lg-9"><h2 '
                                        + 'class="list-group-item-heading">'
                                        + snapshotMovie.child("name").val().toUpperCase()
                                        + '</h2><br><p class="list-group-item-text">'
                                        + 'Reparto: ' + snapshotMovie.child("cast").val()
                                        + '<br>Dirección: '
                                        + snapshotMovie.child("direction").val()
                                        + '<br>Estudio: '
                                        + snapshotMovie.child("filmstudio").val()
                                        + '<br>Género: '
                                        + snapshotMovie.child("genre").val()
                                        + '<br>Clasificación: '
                                        + snapshotMovie.child("classification").val()
                                        + '</p><br><div class="btn-group"><a href="'
                                        + snapshotMovie.child("trailer").val()
                                        + '" class="btn btn-info btn-md sr-button">'
                                        + 'Trailer</a><a href="'
                                        + snapshotMovie.child("critics").val()
                                        + '"class="btn btn-danger btn-md sr-button">'
                                        + 'Crítica</a><a ' 
                                        + 'class="btn btn-success'
                                        + ' btn-md sr-button"'
                                        + ' id="btn' + movieKey + '">'
                                        + 'Comprar tiquetes</a></div></div></div><br><br>';
                                    // inserting html code
                                    $("#movieslistGroup").append(listItem);
                                    // adding show and hour
                                    $("#item" + movieKey)
                                        .attr("data-shows-hours", 
                                            '"' + showKey + '"'
                                            + ':' 
                                            + '"' + showHour + '"'
                                        );
                                    // adding show and its capacity
                                     $("#item" + movieKey)
                                        .attr("data-shows-capacities", 
                                            '"' + showKey + '"'
                                            + ':' 
                                            + '"' + showCapacity + '"'
                                        );    
                                    // adding show and its price
                                    $("#item" + movieKey)
                                        .attr("data-shows-prices", 
                                            '"' + showKey + '"'
                                            + ':' 
                                            + '"' + showPrice + '"'
                                        );    
                                    // adding function to buy button
                                    $("#btn" + movieKey)
                                    .bind("auxBuyTickets", function() {
                                        buyTickets(movieKey)
                                    });
                                    $("#btn" + movieKey).click(function() {
                                        $(this).trigger("auxBuyTickets");
                                    });
                                } else {
                                    // adding another show and hour
                                    var oldDataShowsHours = $("#item" + movieKey)
                                        .attr("data-shows-hours");
                                    $("#item" + movieKey)
                                        .attr("data-shows-hours", 
                                            oldDataShowsHours + "," 
                                            + '"' + showKey + '"'
                                            + ':' 
                                            + '"' + showHour + '"'
                                        );
                                    // adding another show and capacity
                                    var oldDataShowsCapacities = $("#item" + movieKey)
                                        .attr("data-shows-capacities");
                                    $("#item" + movieKey)
                                        .attr("data-shows-capacities", 
                                            oldDataShowsCapacities + "," 
                                            + '"' + showKey + '"'
                                            + ':' 
                                            + '"' + showCapacity + '"'
                                        );    
                                    // adding another show and price
                                    var oldDataShowsPrices = $("#item" + movieKey)
                                        .attr("data-shows-prices");
                                    $("#item" + movieKey)
                                        .attr("data-shows-prices", 
                                            oldDataShowsPrices + "," 
                                            + '"' + showKey + '"'
                                            + ':' 
                                            + '"' + showPrice + '"'
                                        );
                                }
                            });
                            
                        }
                    });
                }
            // end forEach    
            });
            // wait for firebase by 1.5 seconds
            setTimeout(function () {
                // show movies if they exist with user preferences
                if (!$("#movieslistGroup").is(":empty")) {
                    showBillboard();
                    // scroll to billboard
                    $("html, body")
                        .animate(
                            {scrollTop: $("#billboard").offset().top}, 
                            "slow"
                        );
                } else {
                    // give user info about why billboard doesn't show
                    swal(
                        "Uups...", 
                        "¡En este momento no tenemos películas con sus preferencias!", 
                        "warning"
                    ); 
                }
            }, 1500);
        }
    });
}

function buyTickets(movieKey) {
    //---------------------------------------------
    // get pref data from init form
    var date = $("#selectDate").val();
    var countryKey = $("#selectCountry").val();
    var branchKey = $("#selectBranch").val();
    var roomTypeKey = $("#selectRoomType").val();
    //---------------------------------------------
    // create show : hour object
    var showsHoursObj = JSON.parse(
        '{' + $("#item" + movieKey).attr("data-shows-hours") + '}'
    );
    // create show : capacity object
    var showsCapacitiesObj = JSON.parse(
        '{' + $("#item" + movieKey).attr("data-shows-capacities") + '}'
    );
    // create show : price object
    var showsPricesObj = JSON.parse(
        '{' + $("#item" + movieKey).attr("data-shows-prices") + '}'
    );
    // select movie hour
    swal({
        title: 'Hora de la película',
        html: '¡Selecciona la hora que prefieras!',
        input: 'select',
        inputOptions: showsHoursObj,
        inputPlaceholder: 'Seleccionar hora',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        animation: false,
        customClass: 'animated rubberBand',
        allowOutsideClick: false
    }).then(function (result) {
        // save showKey
        sessionStorage.setItem("selectedShow", result);
        // display hour option to user
        swal({
            type: 'success',
            title: '¡Buena elección!',
            html: 'Verás la película a esta hora: ' + showsHoursObj[result],
            animation: false,
            customClass: 'animated pulse',
            allowOutsideClick: false
        }).then(function () {
            // ask for user's email
            swal({
                title: 'Correo electrónico',
                html: 'Ingresa tu correo electrónico',
                input: 'email',
                inputPlaceholder: 'deadpool@badass.com',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
                animation: false,
                customClass: 'animated pulse',
                allowOutsideClick: false
            }).then(function (email) {
                // save user's email
                sessionStorage.setItem("userEmail", email);
                // display email to user
                swal({
                    type: 'success',
                    title: '¡Genial!',
                    html: 'Los tiquetes se enviarán a ' + email
                }); // delete; then
            });
        });
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
