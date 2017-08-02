$(document

	).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEM2TQ6t0dPwep1Vnp__gk6Q81SkZksyw",
    authDomain: "train-sheet.firebaseapp.com",
    databaseURL: "https://train-sheet.firebaseio.com",
    projectId: "train-sheet",
    storageBucket: "train-sheet.appspot.com",
    messagingSenderId: "1041935266879"
  };
 
 firebase.initializeApp(config);
 var database = firebase.database();

 $("#submit").on("click", function(event) {
 	event.preventDefault();

	var name = $('#nameinput').val().trim();
    var dest = $('#destinput').val().trim();
    var time = $('#timeinput').val().trim();
    var freq = $('#freqinput').val().trim();


 	var newTrain = {
 		name: name,
 		dest: dest,
 		time: time,
 		freq: freq,
 		timeAdded: firebase.database.ServerValue.TIMESTAMP
 	};

 	database.ref().push(newTrain);

 	console.log(newTrain.name);
 	console.log(newTrain.dest);
 	console.log(newTrain.time);
 	console.log(newTrain.freq);
 	console.log(newTrain.timeAdded);

 	alert("New Train Successfully Added");

 	$("#nameinput").val("");
 	$("#destinput").val("");
 	$("#timeinput").val("");
 	$("#freqinput").val("");

 });

 database.ref().on("child_added", function(childSnapshot){
 	console.log(childSnapshot.val());

 	var name = childSnapshot.val().name;
 	var dest = childSnapshot.val().dest;
 	var time = childSnapshot.val().time;
 	var freq = childSnapshot.val().freq;

 	console.log(name);
 	console.log(dest);
 	console.log(time);
 	console.log(freq);
//calculations

	var freq = parseInt(freq);

	var currentTime = moment();
	console.log("CURRENT TIME: " + moment().format('MMMM Do YYYY, h:mm:ss a'));

	var dConverted = moment(childSnapshot.val().time, 'HH:mm');
	console.log("DATE CONVERTED: " + dConverted);
	var trainTime = moment(dConverted).format('HH:mm');
	console.log("TRAIN TIME : " + trainTime);
	

	var tConverted = moment(trainTime, 'HH:mm');
	var tDifference = moment().diff(moment(tConverted), 'minutes');
	console.log("DIFFERENCE IN TIME: " + tDifference);
	
	var tRemainder = tDifference % freq;
	console.log("TIME REMAINING: " + tRemainder);
	
	var minsAway = freq - tRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
	
	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));

$('#currentTime').text(currentTime);
$('#trainTable').append(
		"<tr><td id='nameDisplay'>" + childSnapshot.val().name +
		"</td><td id='destDisplay'>" + childSnapshot.val().dest +
		"</td><td id='freqDisplay'>" + childSnapshot.val().freq +
		"</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
		"</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
 },

);
});

  