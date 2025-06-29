import React, { useState, useEffect } from 'react'
import TagInput from './TagInput'
import { MdClose } from 'react-icons/md'
import axios from 'axios'

const AddEditNote = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [error, setError] = useState(null)

  // Prefill fields on edit
  useEffect(() => {
    if (type === 'edit' && noteData) {
      setTitle(noteData.title || '')
      setContent(noteData.content || '')
      setTags(noteData.tags || [])
    }
  }, [type, noteData])

  // Add note
  const addNewNote = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:3001/api/note/add',
        { title, content, tags },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      onClose() // Close modal on success
    } catch (err) {
      setError('Error creating note')
      console.error(err)
    }
  }

  // Edit note
  const editNote = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `http://localhost:3001/api/note/${noteData._id}`,
        { title, content, tags },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      onClose() // Close modal on success
    } catch (err) {
      setError('Error updating note')
      console.error(err)
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError('Please Enter the Title')
      return
    }
    if (!content) {
      setError('Please Enter the Content')
      return
    }
    setError('')

    if (type === 'edit') {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className='relative'>
      <button
        className='w-10 h-10 justify-center rounded-full flex items-center absolute -top-3 -right-3 hover:bg-slate-50'
        onClick={onClose}
      >
        <MdClose className='text-xl text-slate-400' />
      </button>
      <div className='flex flex-col gap-2'>
        <label className='text-l text-slate-400'>TITLE</label>
        <input
          type='text'
          className='text-sm text-slate-950 outline-none'
          placeholder='Go To Hell'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='text-l text-slate-400'>CONTENT</label>
        <textarea
          type='text'
          className='text-sm text-slate-950 outline-none rounded bg-slate-50 p-2'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <label className='text-sm text-slate-400'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className='text-xs pt-4 text-red-800'>{error}</p>}
      <button className='btn-primary font-medium !mt-5 p-3' onClick={handleAddNote}>
        {type === 'edit' ? 'Update' : 'Add'}
      </button>
    </div>
  )
}

export default AddEditNote
