// Note model
// ==========

// Require mongoose
const mongoose = require("mongoose");
// Create the schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the noteSchema with the schema object
const noteSchema = new Schema({
  // The headline is the article associate with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  // date is just a string
  date: {
    type: Date,
    default: Date.now
  },
  // as is the noteText
  noteText: String
});

// Create the Note model using the noteSchema
const Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;