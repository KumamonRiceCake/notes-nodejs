const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note already exists!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updated = notes.filter((note) => note.title !== title)

    if (notes.length > updated.length) {
        saveNotes(updated)
        console.log(chalk.green.inverse('Note removed!'))
    } else
        console.log(chalk.red.inverse('Note not found!'))
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Saved notes:'))
    notes.forEach((note) => console.log(chalk.inverse(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const found = notes.find((note) => note.title === title)

    if (found) {
        console.log(chalk.blue.inverse(found.title))
        console.log(chalk.inverse(found.body))
    } else
        console.log(chalk.red.inverse('Note not found!'))
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}