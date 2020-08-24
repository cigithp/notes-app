const yargs = require('yargs')
const notes = require('./notes.js')
const log = console.log

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
    handler: function(argv){
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
    handler: function(argv){
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: function(){
        log('Listing all notes!')
    }
})
yargs.command({
    command: 'read',
    describe: 'Reading a note!',
    handler: function(){
       log('Reading the note!')
    }
})

yargs.parse()