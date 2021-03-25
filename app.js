const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')

// fs.writeFileSync('notes.txt', 'This file is created using node!');
// fs.writeFileSync('notes.txt', 'This is the updated file created by node!');
// fs.appendFileSync('notes.txt', 'This text is apppended');

// console.log(chalk.blue.underline.bold(validator.isEmail('amar@gmail.com')));
// const checkEmail = chalk.green.bgYellow(validator.isEmail('amar@gmail.c'));
// console.log(checkEmail);

// console.log(process.argv);
// console.log(yargs.argv);
// console.log(process.argv[2]);

// create add command 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        // console.log("Title:", argv.title);
        // console.log("Body:", argv.body);
        notes.addNotes(argv.title, argv.body);
    }
});

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Removing a note !',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'Displaying the notes list',
    handler() {
        notes.listNotes();
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'Reading a note !',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Reading a note !');
        notes.readNote(argv.title);
    }
})

// console.log(yargs.argv);
yargs.parse();