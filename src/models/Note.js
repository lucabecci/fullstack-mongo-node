const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      tyoe: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Note", NoteSchema);
