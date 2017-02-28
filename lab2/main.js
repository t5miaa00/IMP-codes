function addPerson()
{
   // This could be done way clearer, but I said fuck it and did this monstrosity...
   document.getElementById('personsbox').innerHTML += "<p>"+ document.getElementById('person').value +"</p>";
}
