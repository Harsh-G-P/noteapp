const Note = require('../models/notemodel')

exports.createNote = async(req,res)=>{
    const {title,content,tags} = req.body

    if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required' });
    }
    try {
    const note= await Note.create({
        userId:req.user.id,
        title,
        content,
        tags
    })
    res.status(201).json(note)

  } catch (err) {
    res.status(500).json({ msg: 'Server error while creating note' })
  }
}

// noteController.js
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ isPinned: -1, createdAt: -1 });
    return res.json(notes)
  } catch (err) {
    res.status(500).json({ msg: 'Server error fetching notes' })
  }
}


exports.deleteNote= async(req,res)=>{
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found or unauthorized' });
    }

    await note.deleteOne();
    res.status(200).json({ msg: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error while deleting note' });
  }
}

exports.editNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required' });
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found or unauthorized' });
    }

    // Update fields
    note.title = title;
    note.content = content;
    note.tags = tags;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ msg: 'Server error while updating note' });
  }
}

exports.togglePinNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ msg: 'Note not found or unauthorized' });

    note.isPinned = !note.isPinned;
    const updated = await note.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error while toggling pin' });
  }
};
