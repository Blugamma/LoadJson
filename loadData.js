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
            res.end();
        }
        
        
    }
    
});

app.get('/save', function (req, res){
    var username = req.query.username;
    var firstname = req.query.firstname;
    var surname = req.query.surname;
    var email = req.query.email;
    var dob = req.query.dob;
    var gender = req.query.gender;
    profiles.push({
        UserName: username,
        FirstName: firstname,
        LastName: surname,
        Email: email,
        DoB: dob,
        Gender: gender
    });
    var profilesStringify = JSON.stringify(profiles, null, 2);
    fs.writeFileSync('profiles.json', profilesStringify), 'utf8', function(err){
    }
    res.write("Profile Creation Completed...");
    res.end();
});

app.get('/edit', function (req, res){
    var NewUserName = req.query.newusername;
    var NewFirstName = req.query.newfirstname;
    var NewSurName = req.query.newsurname;
    var NewEmail = req.query.newemail;
    var NewDoB = req.query.newdob;
    var NewGender = req.query.newgender;
    for (var i = 0; i < profiles.length; i++){
        if (profiles[i].UserName === NewUserName){
            profiles[i].UserName = NewUserName;
            profiles[i].FirstName = NewFirstName;
            profiles[i].LastName = NewSurName;
            profiles[i].Email = NewEmail;
            profiles[i].DoB = NewDoB;
            profiles[i].Gender = NewGender;
        }
    }
    var profilesStringify = JSON.stringify(profiles, null, 2);
    fs.writeFileSync('profiles.json', profilesStringify), 'utf8');
    res.write("Edit Completed...");
    res.end();

});

app.get('/delete', function (req, res){
    var reqName = req.query.username;
    for (var i = 0; i < profiles.length; i++){
        if (profiles[i].UserName === reqName){
            var selectedIndex = profiles.indexOf(profiles[i]);
            var deletedUser = profiles[i].UserName;
            profiles.splice(selectedIndex, 1);
            res.send("Deleted "+ deletedUser);
            var profilesStringify = JSON.stringify(profiles, null, 2);
            fs.writeFileSync('profiles.json', profilesStringify), 'utf8', function(err){
            }
        }
        
    }
});

app.listen(2323, function (){
    console.log('Port 2323 is open');
}); 