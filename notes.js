const fs = require('fs')
const chalk = require('chalk')
const log = console.log
const success = chalk.bold.green.inverse
const error = chalk.bold.red.inverse
const noteTitle = chalk.blueBright
const heading = chalk.bold.blue
const noteBody = chalk.yellow

const getNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(!note) {
        log(error('Note not found'))
    } else {
        log(noteTitle(note.title))
        log(noteBody(note.body))
    }
}


const addNote = (title, body) => {
    const notes = loadNotes()
    const dupes = notes.filter((note) => note.title === title)
    if(dupes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        log(success('New note added'))
    } else {
        log(error('Title already taken!!'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== title)
    debugger
    if(notes.length === updatedNotes.length) {
        log(error('No Note found'))
    } else {
        saveNotes(updatedNotes)
        log(success('Note removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    log(heading('Your notes..'))
    notes.forEach(note => {
        log(noteTitle(note.title))
        log(noteBody(note.body))
    });
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}