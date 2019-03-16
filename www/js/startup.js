// code to process the html files 
function loadW3HTML() {
    w3.includeHTML();
}

//wait for document to load, then start tracking user
function startup() {
    document.addEventListener('DOMContentLoaded', function () {
        trackAndCircle();
    }, false);
}

function questionStartup() {
    alert("Welcome to the Questions App!");
    document.addEventListener('DOMConentLoaded', function () {
        getPort(); // obtain port number 
        loadW3HTML(); // add HTML functionality
        trackLocation(); // track the user's location
    }, false);
}

function quizStartup() {
    alert("Welcome to the Quiz App!");
    document.addEventListener('DOMConentLoaded', function () {
        getPort(); // obtain port number 
        loadW3HTML(); // add HTML functionality
        trackLocation(); // track the user's location
        // add code here to zoom into the area where user is to make it easier to choose quiz point?
        // check code sources 

    }, false);
} 
