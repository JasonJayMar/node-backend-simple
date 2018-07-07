//gives network access - enables ability to handle all http methods
const http = require('http');
//file access
const fs = require('fs')
//url access
const url = require('url');
//access to pull something from url
var querystring = require('querystring');
//weird writing
const figlet = require('figlet')

//server creation
const server = http.createServer(function(req, res) {
  //parsing url and storing it as a variable
  const page = url.parse(req.url).pathname;
  //checking for API query parameters that were sent with the url
  var params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  //conditionals checking what the request url was homepage
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });//conditionals checking what the request url was "otherpage.html"
  }else if (page == '/api') {
    //check if pokemon query string was a parameter
    if('pokemon' in params){
      //check what the pokemon query string equaled
      if(params['pokemon']== 'Chimchar'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        var objToJson = {
          name: "Chimchar",
          type: "Fire Type",
          number: "#390",
          animal: "Monkey"
        }
        res.end(JSON.stringify(objToJson));
      }else if(params['pokemon'] == 'Turtwig'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        var objToJson = {
          name: "Turtwig",
          type: "Grass Type",
          number: "#387",
          animal: "Turtle"
        }
        res.end(JSON.stringify(objToJson));
      }else if(params['pokemon'] == 'Piplup'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        var objToJson = {
          name: "Piplup",
          type: "water Type",
          number: "#393",
          animal: "Penguin"
        }
        res.end(JSON.stringify(objToJson));
      }//pokemon != leon
    }//pokemon if
  }//else if
  //makes it so the server knows where to fetch css
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });//makes it so the server knows where to fetch js
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      //res.writeHead isn't mandatory but nice to include
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!', function(err, data) {
      if (err) {
          console.log('The pokemon seem to have escaped...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
