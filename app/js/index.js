/*
    +----------------------------------------
    project: cineTEC
    -----------------------------------------
    file: index.js
    -----------------------------------------
    author: Elberth Adrian Garro Sanchez
    -----------------------------------------
    session storages key:
        * branch
        * shows
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
        var date = $("#selectDate").val();
        var countryKey = $("#selectCountry").val();
        var branchKey = $("#selectBranch").val();
        var roomTypeKey = $("#selectRoomType").val();
        if (date===""|| countryKey===null||branchKey===null||roomTypeKey===null) {
            swal(
                "Uups...", 
                "¡No has seleccionado todos los datos!", 
                "warning"
            );
        } else {
            createBillBoard(date, branchKey, roomTypeKey)
        }
    });
}

function createBillBoard(date, branchKey, roomTypeKey) {
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
                    // fiveth, last step, have show the room type chosen?
                    refRoom.once("value").then(function (snapshotRoom) {
                        if (snapshotRoom.child("roomtypeKey").val() == roomTypeKey) {
                            // get show key
                            var showKey = childSnapshotShow.key
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
                                        + 'data-shows="' + showKey + '"'
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
                                        + 'Crítica</a><a id="btn'
                                        + movieKey + '"class="btn btn-success'
                                        + 'btn-md sr-button">'
                                        + 'Comprar tiquetes</a></div></div></div><br>';
                                    // inserting html code
                                    $("#movieslistGroup").append(listItem);
                                    // adding function to buy button
                                    $("#btn" + movieKey)
                                    .bind("auxBuyTickets", function() {
                                        buyTickets(branchKey, movieKey)
                                    });
                                    $("#btn" + movieKey).click(function() {
                                        $(this).trigger("auxBuyTickets");
                                    });
                                } else {
                                    var oldDataShows = $("#item" + movieKey)
                                        .attr("data-shows");
                                    $("#item" + movieKey)
                                        .attr("data-shows", oldDataShows + "," + showKey);
                                }
                            });
                            showBillboard();
                            // scroll to billboard
                            $("html, body")
                                .animate(
                                    {scrollTop: $("#billboard").offset().top}, 
                                    "slow"
                                );
                        }
                    });
                }
            });
            // end forEach
        }
    });
    // give user info about why 
    // billboard doesn't show
    setTimeout(function (){
        if ($("#billboard").is(":hidden")) {
            swal(
                "Uups...", 
                "¡En este momento no tenemos películas con sus preferencias!", 
                "warning"
            );
        }
    }, 2000);
}

// , showsKeys
function buyTickets(branchKey, movieKey) {
    console.log(branchKey);
    console.log($("#item" + movieKey).attr("data-shows"));
    // var inputOptions = {};
    // inputOptions["088"] = "Adrian";
    /*swal({
        title: 'Select Ukraine',
        input: 'select',
        inputOptions: {
            'SRB': 'Serbia',
            'UKR': 'Ukraine',
            'HRV': 'Croatia'
        },
        inputPlaceholder: 'Select country',
        showCancelButton: true,
        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
                if (value === 'UKR') {
                    resolve()
                } else {
                    reject('You need to select Ukraine :)')
                }
            })
        }
    }).then(function (result) {
        swal({
            type: 'success',
            html: 'You selected: ' + result
        })
    })*/
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
