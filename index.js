// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    var data= {
        members: [
            {
            email_address: email,
            status: "subscribed",

            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
           
            }
        ]
    };

    const jasonData = JSON.stringify(data);

    const url = " https://us18.api.mailchimp.com/3.0/lists/6729e4bc53";

    const options = {
        method: "POST",
        auth: "sahil1:56f5967a1bfeea1c7ce6c5afafbbf4fd-us18"
    }

    const request = https.request(url, options, function(responce){

        if (responce.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }


        responce.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jasonData);
    request.end();

})

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


// API Key
// 56f5967a1bfeea1c7ce6c5afafbbf4fd-us18

// list Id
// 6729e4bc53