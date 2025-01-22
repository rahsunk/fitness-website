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
  // console.log(req.query);
  Workout.find({ id: req.query.id, program: req.query.program }).then(
    (existingWorkouts) => {
      console.log(req.query);
      if (existingWorkouts.length != 0) {
        let newWorkout1 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Warm-Up"
        );
        let newWorkout2 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Workout 1"
        );
        let newWorkout3 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Workout 2"
        );
        let newWorkout4 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Final Workout"
        );
        res.send([newWorkout1, newWorkout2, newWorkout3, newWorkout4]);

        // res.send(existingWorkouts);
      } else {
        let newWorkout1 = new Workout({
          id: req.query.id,
          program: req.query.program,
          name: "Warm-Up",
          img: "https://static-00.iconduck.com/assets.00/fire-emoji-402x512-8ma95d17.png",
          status: "unlock",
          exerciseList: [
            {
              name: "Arm Circles Forward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Arm Circles Backward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Band Pull Aparts",
              img: "https://liftmanual.com/wp-content/uploads/2023/04/resistance-band-pull-apart.jpg",
              rep: "1x15",
              timed: false,
            },
            {
              name: "Thread the Needle",
              img: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/thread-the-needle-muscles-1024x345.png",
              rep: "1x10",
              timed: false,
            },
          ],
        });
        newWorkout1.save();
        let newWorkout2 = new Workout({
          id: req.query.id,
          program: req.query.program,
          name: "Workout 1",
          img: "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f4aa.png",
          status: "lock",
          exerciseList: [
            {
              name: "Arm Circles Forward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Arm Circles Backward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Band Pull Aparts",
              img: "https://liftmanual.com/wp-content/uploads/2023/04/resistance-band-pull-apart.jpg",
              rep: "1x15",
              timed: false,
            },
            {
              name: "Thread the Needle",
              img: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/thread-the-needle-muscles-1024x345.png",
              rep: "1x10",
              timed: false,
            },
          ],
        });
        newWorkout2.save();
        let newWorkout3 = new Workout({
          id: req.query.id,
          program: req.query.program,
          name: "Workout 2",
          img: "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f4aa.png",
          status: "lock",
          exerciseList: [
            {
              name: "Arm Circles Forward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Arm Circles Backward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Band Pull Aparts",
              img: "https://liftmanual.com/wp-content/uploads/2023/04/resistance-band-pull-apart.jpg",
              rep: "1x15",
              timed: false,
            },
            {
              name: "Thread the Needle",
              img: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/thread-the-needle-muscles-1024x345.png",
              rep: "1x10",
              timed: false,
            },
          ],
        });
        newWorkout3.save();
        let newWorkout4 = new Workout({
          id: req.query.id,
          program: req.query.program,
          name: "Final Workout",
          img: "https://static-00.iconduck.com/assets.00/person-lifting-weights-emoji-2048x2045-vjjgypu7.png",
          status: "lock",
          exerciseList: [
            {
              name: "Arm Circles Forward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Arm Circles Backward",
              img: "https://cdn.jefit.com/assets/img/exercises/gifs/867.gif",
              rep: "1x10",
              timed: false,
            },
            {
              name: "Band Pull Aparts",
              img: "https://liftmanual.com/wp-content/uploads/2023/04/resistance-band-pull-apart.jpg",
              rep: "1x15",
              timed: false,
            },
            {
              name: "Thread the Needle",
              img: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/thread-the-needle-muscles-1024x345.png",
              rep: "1x10",
              timed: false,
            },
          ],
        });
        newWorkout4.save();
        res.send([newWorkout1, newWorkout2, newWorkout3, newWorkout4]);
      }
    }
  );
});

router.post("/clear", (req, res) => {
  console.log("clear");

  Workout.findOne({
    id: req.body.id,
    program: req.body.program,
    name: req.body.name,
  }).then((obj) => {
    obj.status = "clear";
    obj.save();
  });

  if (req.body.name === "Warm-Up") {
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 1",
    }).then((obj) => {
      obj.status = "unlock";
      obj.save();
    });
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 2",
    }).then((obj) => {
      obj.status = "unlock";
      obj.save();
    });
  } else if (req.body.name === "Workout 1") {
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 1",
    }).then((obj) => {
      if (obj.status === "clear") {
        Workout.findOne({
          id: req.body.id,
          program: req.body.program,
          name: "Final Workout",
        }).then((obj) => {
          obj.status = "unlock";
          obj.save();
        });
      }
    });
  } else if (req.body.name === "Workout 2") {
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 1",
    }).then((obj) => {
      if (obj.status === "clear") {
        Workout.findOne({
          id: req.body.id,
          program: req.body.program,
          name: "Final Workout",
        }).then((obj) => {
          obj.status = "unlock";
          obj.save();
        });
      }
    });
  }
});

// Workout.updateOne(
//   { name: "Workout 1" },
//   { $set: { status: "clear" } },
//   (err, docs) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(docs);
//     }
//   }
// );

// (err, docs) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(docs);
//   }

// Workout.findOneAndUpdate(
//   { program: req.body.program },
//   { status: "clear" }
// (err, docs) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(docs);
//   }
// }
// );
// Workout.updateOne(
//   { id: req.body.id, program: req.body.program, name: req.body.name },
//   { $set: { status: "clear" } }
// );
// if (req.body.name === "Warm-Up") {
//   Workout.updateOne(
//     { id: req.body.id, program: req.body.program, name: "Workout 1" },
//     { $set: { status: "unlock" } }
//   );
//   Workout.updateOne(
//     { id: req.body.id, program: req.body.program, name: "Workout 2" },
//     { $set: { status: "unlock" } }
//   );
// } else if (req.body.name === "Workout 1") {
//   Workout.findOne({
//     id: req.body.id,
//     program: req.body.program,
//     name: "Workout 2",
//   }).then((otherWorkout) => {
//     if (otherWorkout.status === "clear") {
//       Workout.updateOne(
//         { id: req.body.id, program: req.body.program, name: "Final Workout" },
//         { $set: { status: "unlock" } }
//       );
//     }
//   });
// } else if (req.body.name === "Workout 2") {
//   Workout.findOne({
//     id: req.body.id,
//     program: req.body.program,
//     name: "Workout 1",
//   }).then((otherWorkout) => {
//     if (otherWorkout.status === "clear") {
//       Workout.updateOne(
//         { id: req.body.id, program: req.body.program, name: "Final Workout" },
//         { $set: { status: "unlock" } }
//       );
//     }
//   });
// }
// });

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
