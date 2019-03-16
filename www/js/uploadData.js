// uploading the answers
function startDataUpload() {
	//extract form values (response values)
	var question_title = document.getElementById("question_title").value;
	var question_text = document.getElementById("question_text").value;

	var choice1_inp = document.getElementById("choice1_inp").value;
	var choice2_inp = document.getElementById("choice2_inp").value;
	var choice3_inp = document.getElementById("choice3_inp").value;
	var choice4_inp = document.getElementById("choice4_inp").value;

	var correct_choice = document.getElementById("correct_choice").value;

	if (correct_choice != '1' && correct_choice != '2' && correct_choice != '3' && correct_choice != '4') {
		alert("Invalid choice number, Please enter a number between 1 and 4.");
	}


	// var devLat = sessionStorage.getItem("devLat");
	// var devLng = sessionStorage.getItem("devLng");
	var pointLat = sessionStorage.getItem("pointLat");
	var pointLng = sessionStorage.getItem("pointLng");


	// console.log("DEV", devLat + " " + devLng);
	console.log("PNT", pointLat + " " + pointLng);


	// alert (postString);
	//processData(postString); //uncomment this!
}

// global variable to hold the request
var client;

//function to make a request
function processData(postString) {
	client = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
	client.open('POST', url, true);
	//notify the server of the data type
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString);
}

//create the code to wait for the response from the data server
//and process the response once received
function dataUploaded() {
	//this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// change the DIV to show the response
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
	}
}