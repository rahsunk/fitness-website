const mongoose = require("mongoose");

//define a comment schema for the database
const WorkoutSchema = new mongoose.Schema({
  id: String,
  program: String,
  name: String,
  img: String,
  status: String,
  status2: String,
  exerciseList: Array,
});

// compile model from schema
module.exports = mongoose.model("workout", WorkoutSchema);
