const fs = require('fs')
const chalk = require('chalk')
const log = console.log
const success = chalk.bold.green.inverse
const error = chalk.bold.red.inverse
const getNotes = function() {
    return 'Your notes...'
}

const addNote = function(title, body) {
    const notes = loadNotes()
    const dupes = notes.filter(function (note) {
        return note.title === title
    })
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

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch(e) {
        return []
    }
}

const removeNote = function(title) {
    const notes = loadNotes()
    const updatedNotes = notes.filter(function (note) {
        return note.title !== title
    })
    if(notes.length === updatedNotes.length) {
        log(error('No Note found'))
    } else {
        saveNotes(updatedNotes)
        log(success('Note removed'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}