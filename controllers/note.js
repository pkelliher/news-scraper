// Controller for our notes
// ========================
const db = require("../models");

module.exports = {
  // Find one note
  find(req, res) {
    db.Note.find({ _headlineId: req.params.id }).then(dbNote => {
      res.json(dbNote);
    });
  },
  // Create a new note
  create(req, res) {
    db.Note.create(req.body).then(dbNote => {
      res.json(dbNote);
    });
  },
  // Delete a note with a given id
  delete(req, res) {
    db.Note.remove({ _id: req.params.id }).then(dbNote => {
      res.json(dbNote);
    });
  }
};