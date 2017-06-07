/*
	____________________________________
	file: index.js
	____________________________________
	author: E. Adrian Garro S.
	____________________________________
*/

var config = {
	apiKey: "AIzaSyBPFPZngjPBsG38peTcXUP8rWA8QnrUanQ",
	authDomain: "cinetec-b2a0f.firebaseapp.com",
	databaseURL: "https://cinetec-b2a0f.firebaseio.com",
	projectId: "cinetec-b2a0f",
	storageBucket: "cinetec-b2a0f.appspot.com",
	messagingSenderId: "171738294119"
};

firebase.initializeApp(config);

$(function showCountries(){
	// create a new connection to firebase
	var refCountries = firebase.database().ref("countries").orderByKey();
	// listen to data updates from firebase
	refCountries.once("value")
		.then(function(snapshot){
			snapshot.forEach(function(childSnapshot) {
				var countryKey = childSnapshot.key;
				var countryData = childSnapshot.val();
				var countryOption = "<option value=" + countryKey + ">" 
					+ countryData.name + "</option>"
				$(countryOption).appendTo("#selectCountry");
				// console.log(countryKey);
				// console.log(countryData.name);
			});
		});
})

