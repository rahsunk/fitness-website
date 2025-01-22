const mongoose = require("mongoose");

//define a comment schema for the database
const ProgramSchema = new mongoose.Schema({
  id: String,
  name: String,
  //   workoutList: Array,
});

// compile model from schema
module.exports = mongoose.model("program", ProgramSchema);
