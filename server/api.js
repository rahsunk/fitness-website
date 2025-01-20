/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Workout = require("./models/workout");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(
      req.user,
      socketManager.getSocketFromSocketID(req.body.socketid)
    );
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/workouts", (req, res) => {
  // empty selector means get all documents
  Workout.find({}).then((workouts) => res.send(workouts));
});

// const Workout1 = new Workout({
//   name: "Final Workout",
//   img: "https://static-00.iconduck.com/assets.00/person-lifting-weights-emoji-2048x2045-vjjgypu7.png",
//   status: "lock",
// });

// Workout1.save().then((story) => res.send(story));

// const navigate = useNavigate();
const Workout_Docs = require("./models/workout");
Workout_Docs.updateOne({ name: "Warm-Up" }, { $set: { status: "clear" } });

// const initGameplay = () => {
//   Workout_Docs.updateOne({ name: "Warm-Up" }, { $set: { status: "clear" } });
//   // navigate("/game");
// };

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
