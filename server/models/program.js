const mongoose = require("mongoose");

//define a comment schema for the database
const ProgramSchema = new mongoose.Schema({
  id: String,
  curProgram: String,
});

// compile model from schema
module.exports = mongoose.model("program", ProgramSchema);
