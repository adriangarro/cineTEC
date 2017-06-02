var config = {
	apiKey: "AIzaSyBPFPZngjPBsG38peTcXUP8rWA8QnrUanQ",
	authDomain: "cinetec-b2a0f.firebaseapp.com",
	databaseURL: "https://cinetec-b2a0f.firebaseio.com",
	projectId: "cinetec-b2a0f",
	storageBucket: "cinetec-b2a0f.appspot.com",
	messagingSenderId: "171738294119"
};

firebase.initializeApp(config);

var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
	console.log(snapshot.val());
}, function (error) {
	console.log("Error: " + error.code);
});
