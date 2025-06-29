import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNote from '../components/AddEditNote';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const token = localStorage.getItem('token');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/note/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const confirm = window.confirm('Delete this note?');
      if (!confirm) return;

      const res = await axios.delete(`http://localhost:3001/api/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Delete response:', res.data);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const openEditModal = (note) => {
  setOpenAddEditModal({ isShown: true, type: 'edit', data: note });
  };

  const handleTogglePin = async (id) => {
  try {
    const res = await axios.patch(`http://localhost:3001/api/note/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes(); // Refresh list to reflect pin state & order
  } catch (err) {
    console.error('Error pinning note:', err);
  }
};

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className='container mx-auto'>
  {notes.length === 0 ? (
    <p className="text-center text-gray-500 mt-10 text-lg">
      No notes found. Add your first note!
    </p>
  ) : (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8'>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          title={note.title}
          date={new Date(note.createdAt).toLocaleDateString()}
          content={note.content}
          tags={note.tags.join(', ')}
          isPinned={note.isPinned}
          onEdit={() => openEditModal(note)}
          onDelete={() => handleDeleteNote(note._id)}
          onPinNote={() => handleTogglePin(note._id)}
        />
      ))}
    </div>
  )}
</div>


      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.2)' } }}
        className='w-[65%] max-h-5/6 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll sm:w-[40%]'
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
            fetchNotes(); // refresh notes after adding
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
