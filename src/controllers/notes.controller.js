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
  newNote.user = req.user.id;
  await newNote.save();
  req.flash("succes_msg", "Note added successfuly");
  res.redirect("/notes");
};

//render for get all notes
notesController.renderNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .sort({ createdAt: "desc" })
      .lean();
    res.render("notes/all-notes", { notes });
  } catch (e) {
    console.log(e);
    res.send("error");
  }
};

//render for form edit
notesController.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not autorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};
//put of data in the form edit
notesController.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("succes_msg", "Note updated successfuly");
  res.redirect("/notes");
};
//function for delete all notes
notesController.deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await Note.findByIdAndDelete(id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not autorized");
    return res.redirect("/notes");
  }
  req.flash("succes_msg", "Note deleted successfully");
  res.redirect("/notes");
};

module.exports = notesController;
