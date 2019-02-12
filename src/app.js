// Modulos 
const fs = require("fs");                       // Modulo para manejar archivos
const _ = require("lodash");                    // Modulo lodash
const yargs = require("yargs");                 // Modulo de parsing de arg

const notes = require("./notes.js");            // Modulo de notas

// El argumento pasado a travez de argumentos de la terminal
const arg = yargs
    .command("add", "Add a new note", {
        title: {
            describe: "Title of note",
            demand: true,
            alias: "t"
        },
        body: {
            describe: "Body of the note",
            demand: true,
            alias: "b"
        }
    })
    .help()
    .argv;
const command = arg._[0];

if (command === 'add') {
    const note = notes.addNote(arg.title, arg.body);
    if (note) {
        console.log("Se agrego nota");
        notes.logNote(note);
    } else {
        console.log("Ya existe una nota con ese nombre");
    }
} else if (command === "list") {
    var allNotes = notes.getAll();
    console.log(`Priniting ${allNotes.length} notes(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
} else if (command === "read") {
    const note = notes.getNote(arg.title);
    if (note) {
        console.log("Nota encontrada");
        notes.logNote(note);
    } else {
        console.log("Nota no encontrada");
    }
} else if (command === "remove") {
    var noteRemove = notes.removeNote(arg.title);
    var message = noteRemove ? "Note was removed" : "Note not found";
    console.log(message);
} else {
    console.log("Command not recognize");
}

