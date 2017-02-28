// Public variables
var connection = new WebSocket("ws://obscure-waters-98157.herokuapp.com");
var audioElement, audioVol, chatbox

// Init script
window.onload = function()
{
   // initializing the variables
   audioVol = document.getElementById('audio-vol');
   audioElement = document.getElementById('audio');
   chatbox = document.getElementById('chatbox');

   initPersons();
   initVolume();
}

// Functions for the WebSocket part --------------------------------------------
// Opening the connection
connection.onopen = function()
{
   var statusMsg = document.getElementById('status');

   statusMsg.innerHTML = "CONNECTED";
   statusMsg.classList.add("success");
   console.log('connection established.');
}
// Error logging
connection.onerror = function(error)
{
   var statusMsg = document.getElementById('status');

   statusMsg.innerHTML = "ERROR, SEE LOG";
   statusMsg.classList.add("error");
   console.log("WebSocket error: " + error);
}
// Recieving messages
connection.onmessage = function(message)
{

   chatbox.insertAdjacentHTML( "afterbegin", "<p>" + message.data + "</p>");
   console.log(message.data);
}

function sendMessage()
{
   var message = document.getElementById('text');
   connection.send(message.value);
   message.value = "";
}

// Functions for localStorage part ---------------------------------------------
function LS_isValNull(value)
{
   return (localStorage.getItem(value) === null);
}
function initPersons()
{
   var namesArray = ["Mary", "John", "Kent"];

   if (LS_isValNull("names"))
   {
      localStorage.setItem("names", JSON.stringify(namesArray));
      console.log("localStorage values set: " + localStorage.getItem("names"));
   }
   else
   {
      console.info("localStorage(\"names\") already initialized");
   }
   listPersons();
}
function listPersons()
{
   var personsElement = document.getElementById("persons-list")
   var persons = localStorage.getItem("names");
   var persons = (persons) ? JSON.parse(persons) : [];

   if (LS_isValNull("names"))
   {
      // do it again!
      initPersons();
      //var timer = setTimeOut(listPersons(), 50);
   }
   else
   {
      // clear the persons element first
      personsElement.innerHTML = "";
      for (i = 0; i < persons.length; i++)
      {
         personsElement.innerHTML += "<div class=\"persons\">" + persons[i] + "</div>";
      }
   }
}
function addPerson()
{
   var name = document.getElementById("name").value;
   var persons = localStorage.getItem("names");
   var persons = (persons) ? JSON.parse(persons) : [];

   persons.push(name);
   localStorage.setItem("names", JSON.stringify(persons));
   listPersons();
}
// Functions for audio/video parts ---------------------------------------------
/* This didn't work, so I made these call in the init script.
var audioElement = document.getElementById('audio');
var audioVol = document.getElementById('audio-vol');
*/

function initVolume()
{
   audioElement.volume = audioVol.value;
   if (! LS_isValNull("audioPlaying") &&
       localStorage.getItem("audioPlaying") === "1")
   {
      audioElement.play();
   }
}
function audioPlay()
{
   audioElement.play();
   // Updating the value of the playback to the localStorage
   localStorage.setItem("audioPlaying", 1);
}
function audioPause()
{
   audioElement.pause();
   // Updating the value of the playback to the localStorage
   localStorage.setItem("audioPlaying", 0);
}
function changeVolume(value)
{
   audioElement.volume = value;
}
