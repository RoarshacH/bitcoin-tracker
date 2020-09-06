// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req,res){
    var option = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs:{
            from: req.body.crypto,
            to:   req.body.fiat,
            amount: req.body.amt
        }
    }
    
    request(option,function(error, response, body){
        var data = JSON.parse(body);
        var price = data.price;
        // var avg =   data.averages.week;
        res.write("<h1>The Current Date is "+data.time +"</h1>")
        res.write("<h2>The Price of "+req.body.amt+ req.body.crypto+" is: "+price+
        req.body.fiat, +"</h2>");
        res.send();
    })
});


app.listen(3000, function(){
    console.log("Server is online at port 3000");
});


