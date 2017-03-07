var fs = require("fs");
var exp = require('express');
var app = exp();
var jsontext = fs.readFileSync("profiles.json","utf8");
var profiles = JSON.parse(jsontext);

app.use(exp.static('public'));

app.get('/profile', function (req, res){
    res.setHeader("Content-Type", "text/html");
    var reqName = req.query.username;
    for (var i = 0; i < profiles.length; i++){
        if (profiles[i].UserName === reqName){
            res.write("Current profile: " + profiles[i].UserName + "<br>");
            res.write("Full Name: " + profiles[i].FirstName + " " + profiles[i].LastName + "<br>");
            res.write("Email: " + profiles[i].Email + "<br>");
            res.write("DoB: " + profiles[i].DoB + "<br>");
            res.write("Gender: " + profiles[i].Gender + "<br>");
        }
        
        
    }
    
});



app.listen(2323, function (){
    console.log('Port 2323 is open');
}); 