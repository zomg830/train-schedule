$(document).ready(function(){
	// 1. Link to Firebase
	var trainData = new Firebase("https://train-scheduler-a928e.firebaseio.com");

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function(){

		var trainName = $("#trainNameInput").val().trim();
		var lineName = $("#lineInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		console.log(trainName);
		console.log(lineName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		var newTrain = {
			name:  trainName,
			line: lineName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		trainData.push(newTrain);

		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
        $("#trainInput").val("");
		$("#trainTimeInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	trainData.on("child_added", function(childSnapshot){

		console.log(childSnapshot.val());

		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		$("#trainTable > tbody").append("<tr><td data-label='Train Name'>" + firebaseName + "</td><td data-label='Line'>" + firebaseLine + "</td><td data-label='Destination'>"+ firebaseDestination + "</td><td data-label='Frequency'>" + firebaseFrequency + " mins" + "</td><td data-label='Next Arrival'>" + nextTrainArrival + "</td><td data-label='Minutes Away'>" + minutes + "</td></tr>");

	});
});