const express = require("express");
//tells us where the file is located
//fspackage use writeFile/appendFile
//maybe add id column to db.json
//5 routes needed total
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

//set up the express app to handle the data parsing
app.use(express.urlencoded({ extended: true}));

app.use(express.json());


//allows our app to 'look in thge public folder for '/assets' folder
app.use(express.static("public"));

let db = require("./db.json");
//console.log(db) returns object 

//API Routes
app.get("/api/notes", function(req, res) {
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    console.log(req.body);
    db.push(req.body);
    req.body.id = db.length;
    res.json(db);
    console.log("mycheck on db", db);
    let writeToDb = JSON.stringify(db);
    fs.writeFile("./db.json", writeToDb , err  => {
        if (err) throw err;
    });
});

app.delete("/api/notes", function(req, res) {
    db.splice(0,1);
    console.log("check on db",db);
    res.json(db);
    console.log("check on my db after delete", db);
    // let deleteNote = 
})

//html Routes
// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    console.log("button works!");
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// * GET `*` - Should return the `index.html` file
//'catchall' in case of any undefined endpoits, the user is returned to the address mentioned below:
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
});


// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.



// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

//false.writeFile to save new db over old db
//have to loop through array to delete note starwars final 59 -71
//pop,shift,splice, might want to add id column to notes array