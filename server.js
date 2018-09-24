// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/*********************************************************************/

app.get('/api/timestamp/:date_string?', (req, res) => {
  let data = req.params.date_string;
  let response={};
  //If there is no text in request, return "Now" date. 
  if(!data)
  {
      let date=new Date();
      response={"unix": date.getTime(), "utc" : date.toUTCString() };
  }
  else
  {
    //If request data string contains only digits - parse it to int.
    if(/^\d+$/.test(data))data=parseInt(data,10); 
    let date=new Date(data);
    if(date.getTime())                            
    {
        response={"unix": date.getTime(), "utc" : date.toUTCString() };
    }
     else
    {
        response={"error" : "Invalid Date" };
    }
  }
  res.send(response);
});

/********************************************************************/


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});