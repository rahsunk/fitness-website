const mongoose = require("mongoose");

//define a comment schema for the database
const WorkoutSchema = new mongoose.Schema({
  name: String,
  img: String,
  status: String,
});

// compile model from schema
module.exports = mongoose.model("workout", WorkoutSchema);
