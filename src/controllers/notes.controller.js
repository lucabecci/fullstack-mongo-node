const notesController = {};

const Note = require("../models/Note");

//render for the form of new note
notesController.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};
// post for the data of form
notesController.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });
  await newNote.save();
  res.redirect("/notes");
};

//render for get all notes
notesController.renderNotes = async (req, res) => {
  const notes = await Note.find().lean();
  res.render("notes/all-notes", { notes });
};

//render for form edit
notesController.renderEditForm = async(req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render('notes/edit-note', { note })
};
//put of data in the form edit
notesController.updateNote = async(req, res) => {
  const {title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect('/notes')
};
//function for delete all notes
notesController.deleteNote = async (req, res) => {
  const id = req.params.id;
  await Note.findByIdAndDelete(id);
  res.redirect("/notes");
};

module.exports = notesController;
