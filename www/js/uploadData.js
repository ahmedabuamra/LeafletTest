// uploading the answers
function startDataUpload () {
	//extract form values (response values)
	var name = document.getElementById("question_title").value;
	var surname = document.getElementById("question_text").value;

	var devLat = sessionStorage.getItem("devLat");
	var devLng = sessionStorage.getItem("devLng");
	var pointLat = sessionStorage.getItem("devLat");
	var pointLng = sessionStorage.getItem("pointLng");
	

	console.log("DEV", devLat + " " + devLng);
	console.log("PNT", pointLat + " " + pointLng);
	
	var postString = "name="+name +"&surname="+surname;
	alert (postString);
	//processData(postString); //uncomment this!
}

// global variable to hold the request
var client;
//function to make a request
function processData(postString) {
	client = new XMLHttpRequest();
	client.open('POST','http://developer.cege.ucl.ac.uk:30272/reflectData',true);
	//notify the server of the data type
	client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString)
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