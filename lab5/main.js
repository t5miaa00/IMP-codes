// Initialize the functions..
$('document').ready(function()
{
   //console.log("Shit works!");
   initPersons();
});

function LS_isValNull(value)
{
   return (localStorage.getItem(value) === null);
}
function initPersons()
{
   var namesArray = [];

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
      $("#persons-list").html("");

      // Display the persons.
      $.each(persons, function(index, value)
      {
         $('<div />').addClass('persons').html(persons[index]).appendTo('#persons-list');
      });
   }
}
function addPerson()
{
   var persons = localStorage.getItem("names");
   var persons = (persons) ? JSON.parse(persons) : [];

   // Push the new person to the array and save it as the localStorage value.
   persons.push($('#name').val());
   localStorage.setItem("names", JSON.stringify(persons));

   // Empty the namefield and list the persons.
   $('#name').val('');
   listPersons();
}
function listAjax()
{
   $.ajax(
      {
         url: 'https://imp-portfolio-demonstration.herokuapp.com/json/persons.jsonp',
         dataType: 'jsonp'
      });
}
function jsonCallback(json)
{
   //console.log(json);
   $.each(json, function(index, value)
   {
      $('<p />').html(value.name + "&emsp;email: <a href=\"mailto:" + value.email + "\">" + value.email + "</a>").appendTo('#ajax-container');
   });
}
