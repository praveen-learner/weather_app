const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const app = express();



app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html")


   

});

app.post("/", function(req,res){
  
    const query = req.body.city;
    const apiKey = {YOUR API KEY PASTE HERE} ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric" ;
    
    https.get(url, function(response){
     console.log(response)    
     
     response.on("data", function(data){
        var weatherData = JSON.parse(data);
        var temp = weatherData.main.temp;
        var description = weatherData.weather[0].description
        var icon = weatherData.weather[0].icon
        var imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        
        res.write("<p>the weather description is "+ description+ "</p>");
        res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius<h1>");
        res.write("<img src=" + imgurl + ">");
        res.send()
        
        
    });
    });
  
});
 

    

app.listen('3000', function(){
    console.log("server is running")
});