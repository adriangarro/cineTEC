/*
	+----------------------------------------
	project: cineTEC
	-----------------------------------------
	file: billboard.js
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

function setHomeHeading() {
	branch = localStorage.getItem("branch");
	$("#homeHeading")
		.text("Presentando en " 
			+ branch
			+ ":"
		);
}

function showBillBoardDetails() {
	//--------------------------------------------------
		var roomType = localStorage.getItem("roomType");
		$("#roomTypeLabel")
			.text(
				"Salas " 
				+ roomType
			);
	//--------------------------------------------------
	// show date
	var date = localStorage
		.getItem("date");
	$("#dateLabel")
		.text(date);
	//--------------------------------------------------
}

jQuery(
	setHomeHeading(),
	showBillBoardDetails()
);

