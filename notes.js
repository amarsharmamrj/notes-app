const fs = require('fs');
const chalk = require('chalk');
const { keyword } = require('chalk');

const getNotes = function() {
    return 'Your notes . .'
}

const addNotes = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title;
    })

    debugger

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green("Notes added"));
    } else {
        console.log(chalk.red.bold("title already taken !"));
    }

}

const saveNotes = function(notes) {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return []
    }
}

// remove notes 
const removeNote = function(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note) {
        return note.title !== title;
    });

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse("Note has been removed !"));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse("No note fouud !"));
    }
}

// list notes
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('Your notes:'));

    notes.forEach((note) => {
        console.log(chalk.green(note.title));
    })
}

// read note
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(chalk.red(note.body));
    } else {
        console.log(chalk.red('No note found !'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}