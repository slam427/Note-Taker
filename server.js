const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

//set up the express app to handle the data parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//allows our app to 'look in thge public folder for '/assets' folder
app.use(express.static("public"));

let db = require("./db.json");

//API Routes
app.get("/api/notes", function (req, res) {
    res.json(db);
});

var x = 1
app.post("/api/notes", function (req, res) {
    req.body.id = x;
    db.push(req.body);
    res.json(db);
    let writeToDb = JSON.stringify(db);
    fs.writeFile("./db.json", writeToDb, err => {
        if (err) throw err;
        x++;
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const noteId = parseInt(req.params.id);
    db.forEach((note, i) => {
        if(note.id === noteId) {
            db.splice(i, 1)
        }
    });
    const writeToDb = JSON.stringify(db);
    fs.writeFile('./db.json', writeToDb, err => {
        if (err) throw err;
    });
    res.json(db);
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});

