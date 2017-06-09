/*
	+----------------------------------------
	project: cineTEC
	-----------------------------------------
	file: cinemaListings.js
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

function setHomeHeading() {
	var countryKey = localStorage.getItem("countryKey");
	var branchKey = localStorage.getItem("branchKey");
	var branchPath = "branches/"
		+ countryKey
		+ "/"
		+ branchKey;
	// create a new connection to firebase
	var refBranch = firebase
		.database()
		.ref(branchPath)
		.orderByKey();
	// listen to data updates from firebase
	refBranch.once("value")
		.then(function (snapshot) {
			var branchName = snapshot.child("name").val();
			$("#homeHeading")
				.text("Presentando en " 
					+ branchName
					+ ":"
				);
		});
}

function showDate() {
	var now = new Date();
	var date = "Actualizada al "
		+ now.toLocaleString();
	$("#date").html(date);
}

jQuery(
	setHomeHeading(),
	showDate()
);
