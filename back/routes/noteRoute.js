const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createNote, getNotes, deleteNote, editNote, togglePinNote } = require('../controller/noteController')

const noteRouter=express.Router()

noteRouter.post('/add',authMiddleware,createNote)
noteRouter.get('/get', authMiddleware, getNotes)
noteRouter.delete('/:id', authMiddleware, deleteNote)
noteRouter.put('/:id', authMiddleware,editNote)
noteRouter.patch('/:id', authMiddleware, togglePinNote)

module.exports=noteRouter