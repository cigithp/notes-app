const yargs = require('yargs')
const notes = require('./notes.js')
const { string } = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Adding a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
            alias: 'b'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing the note',
    builder: {
        title: {
            description: 'Note title', 
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler(){
        notes.listNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Note title to be read',
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv){
       notes.getNote(argv.title)
    }
})

yargs.parse()