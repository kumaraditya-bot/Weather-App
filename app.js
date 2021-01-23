const express = require("express")
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extende: true}));

app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  const query = req.body.cityName
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDiscription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1><center>The temprature in "+ query + " is " + temp + " deg. C</center></h1>")
      res.write("<h3><center>The weather is currently " + weatherDiscription + "</center></h3>")
      res.write("<center><img src=" + imageURL +"></center>");
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("Server is running at 3000");
});
