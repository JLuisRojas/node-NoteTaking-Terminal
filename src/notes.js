const fs = require("fs");

var note = { };       // Objeto a exportar

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch (e) { 
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

note.addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body
    };

    var duplicateNotes = notes.filter((note) => {
        // Si regresas verdadero el elemento se filtra
        // Si regresas falso el elemento se queda
        return note.title === title;
    });

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        
        return note;
    }
};

note.getAll = () => {
    return fetchNotes();
};

note.getNote = (title) => {
    var notes = fetchNotes();
    var searchedNote = notes.filter((note) => note.title === title);
    return searchedNote[0];
};

note.removeNote = (title) => {
    // fetch notes
    var notes = fetchNotes();
    // filter notes
    var newNotes = notes.filter((note) => note.title !== title);
    // save new notes array
    saveNotes(newNotes);

    return notes.length !== newNotes.length;
}

note.logNote = (note) => {
    // Break on this line and use repl to output note
    // use node inspect app.js read --title"..."
    // debugger;
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

// Module.exports es un objeto
module.exports = note;