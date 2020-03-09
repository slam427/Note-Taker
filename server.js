const express = require("express");
//tells us where the file is located
//fspackage use writeFile/appendFile
//maybe add id column to db.json
//5 routes needed total
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

//set up the express app to handle the data parsing
app.use(express.urlencoded({ extended: true}));

app.use(express.json());


//allows our app to 'look in thge public folder for '/assets' folder
app.use(express.static("public"));

let db = require("./db.json");
//console.log(db) returns object 

//API Routes
app.get("/api/notes", function(res, req){
    res.json(db);
})

//html Routes
app.get("/notes", function(req, res) {
    console.log("button works!")
    res.sendFile(path.join(_dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(_dirname, "public/index.html"));
})

app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
});


//false.writeFile to save new db over old db
//have to loop through array to delete note starwars final 59 -71
//pop,shift,splice, might want to add id column to notes array