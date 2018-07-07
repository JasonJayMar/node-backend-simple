//calls on function makeReq(uest)
document.getElementById("clickMe").onclick = makeReq;

function makeReq(){
  //pull value out of input and store in variable
  var userName = document.getElementById("userName").value;
  //make get request
  var request = new XMLHttpRequest();
  request.open('GET', '/api?pokemon='+userName, true);

  request.onload = function() {
      console.log("works")
      //will only continue if you get 200lvl or above request
      if (request.status >= 200 && request.status < 400) {
        // Success! Pull value from json
        var data = JSON.parse(request.responseText);
        console.log(data)
        //insert JSON info into the DOM with the following 3 innerHTMLs
        document.getElementById("pokemonName").innerHTML = data.name
        document.getElementById("pokemonType").innerHTML = data.type
        document.getElementById("pokemonNumber").innerHTML = data.number
        document.getElementById("pokemonAnimal").innerHTML = data.animal  

      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
}
