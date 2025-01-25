/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

// import fire from "../client/src/assets/fire.png";

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Workout = require("./models/workout");
const Program = require("./models/program");

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

router.get("/programs", (req, res) => {
  Program.findOne({ id: req.query.id }).then((programObj) => {
    if (programObj) {
      res.send(programObj);
    } else {
      let newProgram = new Program({
        id: req.query.id,
        curProgram: "Upper Body",
      });
      newProgram.save();
      res.send(newProgram);
    }
  });
});

router.post("/programs", (req, res) => {
  Program.findOne({ id: req.body.id }).then((programObj) => {
    programObj.curProgram = req.body.program;
    programObj.save();
  });
});

router.get("/workouts", (req, res) => {
  Workout.find({ id: req.query.id, program: req.query.program }).then(
    (existingWorkouts) => {
      if (existingWorkouts.length != 0) {
        let newWorkout1 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Warm-Up"
        );

        if (newWorkout1.status === "ongoing") {
          Workout.findOne({
            id: req.query.id,
            program: req.query.program,
            name: newWorkout1.name,
          }).then((obj) => {
            obj.status = obj.status2;
            obj.save();
            newWorkout1 = obj;
          });
        }

        let newWorkout2 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Workout 1"
        );

        if (newWorkout2.status === "ongoing") {
          Workout.findOne({
            id: req.query.id,
            program: req.query.program,
            name: newWorkout1.name,
          }).then((obj) => {
            obj.status = obj.status2;
            obj.save();
            newWorkout2 = obj;
          });
        }

        let newWorkout3 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Workout 2"
        );

        if (newWorkout3.status === "ongoing") {
          Workout.findOne({
            id: req.query.id,
            program: req.query.program,
            name: newWorkout1.name,
          }).then((obj) => {
            obj.status = obj.status2;
            obj.save();
            newWorkout3 = obj;
          });
        }

        let newWorkout4 = existingWorkouts.find(
          (newWorkout1) => newWorkout1.name === "Final Workout"
        );

        if (newWorkout4.status === "ongoing") {
          Workout.findOne({
            id: req.query.id,
            program: req.query.program,
            name: newWorkout1.name,
          }).then((obj) => {
            obj.status = obj.status2;
            obj.save();
            newWorkout4 = obj;
          });
        }

        res.send([newWorkout1, newWorkout2, newWorkout3, newWorkout4]);
      } else {
        if (req.query.program === "Upper Body") {
          let newWorkout1 = new Workout({
            id: req.query.id,
            program: req.query.program,
            name: "Warm-Up",
            img: "https://static-00.iconduck.com/assets.00/fire-emoji-402x512-8ma95d17.png",
            status: "unlock",
            status2: "unlock",
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
            status2: "lock",
            exerciseList: [
              {
                name: "Bicep Curls",
                img: "https://training.fit/wp-content/uploads/2018/12/bizepscurls.png",
                rep: "2x20",
                timed: false,
              },
              {
                name: "Lateral Raises",
                img: "https://weighttraining.guide/wp-content/uploads/2016/05/dumbbell-lateral-raise-resized.png",
                rep: "2x10",
                timed: false,
              },
              {
                name: "Shoulder Presses",
                img: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Shoulder-Press-resized.png",
                rep: "1x15",
                timed: false,
              },
              {
                name: "Pull-Ups",
                img: "https://miro.medium.com/v2/resize:fit:1204/0*7QM2F6_wgL61EwY-",
                rep: "1x5",
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
            status2: "lock",
            exerciseList: [
              {
                name: "Tricep Dips",
                img: "https://training.fit/wp-content/uploads/2020/03/arnold-dips.png",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Bench Press (Barbell)",
                img: "https://kinxlearning.com/cdn/shop/files/exercise-52_1000x.jpg?v=1613154688",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Incline Bench Press (Dumbbell)",
                img: "https://cdn-0.weighttraining.guide/wp-content/uploads/2016/11/incline-dumbbell-bench-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4",
                rep: "2x10",
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
            status2: "lock",
            exerciseList: [
              {
                name: "Bicep Curls",
                img: "https://training.fit/wp-content/uploads/2018/12/bizepscurls.png",
                rep: "2x20",
                timed: false,
              },
              {
                name: "Lateral Raises",
                img: "https://weighttraining.guide/wp-content/uploads/2016/05/dumbbell-lateral-raise-resized.png",
                rep: "2x10",
                timed: false,
              },
              {
                name: "Shoulder Presses",
                img: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Shoulder-Press-resized.png",
                rep: "1x15",
                timed: false,
              },
              {
                name: "Pull-Ups",
                img: "https://miro.medium.com/v2/resize:fit:1204/0*7QM2F6_wgL61EwY-",
                rep: "1x5",
                timed: false,
              },
              {
                name: "Tricep Dips",
                img: "https://training.fit/wp-content/uploads/2020/03/arnold-dips.png",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Bench Press (Barbell)",
                img: "https://kinxlearning.com/cdn/shop/files/exercise-52_1000x.jpg?v=1613154688",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Incline Bench Press (Dumbbell)",
                img: "https://cdn-0.weighttraining.guide/wp-content/uploads/2016/11/incline-dumbbell-bench-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4",
                rep: "2x10",
                timed: false,
              },
            ],
          });
          newWorkout4.save();
          res.send([newWorkout1, newWorkout2, newWorkout3, newWorkout4]);
        } else if (req.query.program === "Lower Body") {
          let newWorkout1 = new Workout({
            id: req.query.id,
            program: req.query.program,
            name: "Warm-Up",
            img: "https://static-00.iconduck.com/assets.00/fire-emoji-402x512-8ma95d17.png",
            status: "unlock",
            status2: "unlock",
            exerciseList: [
              {
                name: "Alternating Forward Lunges",
                img: "https://trainingstation.co.uk/cdn/shop/articles/Lunges-movment_900x.webp?v=1719507455",
                rep: "2x10",
                timed: false,
              },
              {
                name: "Squats",
                img: "https://cdn.shopify.com/s/files/1/1876/4703/files/Squat-Muscles-Worked_-_Shutterstock_2329917681_1024_x_864_1024x1024.jpg?v=1693741395",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Alternating Side Lunges",
                img: "https://cdn.shopify.com/s/files/1/0252/3155/6686/files/Muscles_Worked_by_Side_Lunges.jpg?v=1714496174",
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
            img: "https://static-00.iconduck.com/assets.00/leg-emoji-1851x2048-p3ci1djr.png",
            status: "lock",
            status2: "lock",
            exerciseList: [
              {
                name: "Medicine Ball Squats",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMbOaCf7h1koSwH5WzYtEBDut0sl4rKaYQg&s",
                rep: "2x10x15",
                timed: false,
              },
              {
                name: "Russian Twist",
                img: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
                rep: "2x10x15",
                timed: false,
              },
              {
                name: "Squat Jumps",
                img: "https://liftmanual.com/wp-content/uploads/2023/04/jump-squat.jpg",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Alternating Kettlebell Lunges",
                img: "https://gymvisual.com/14209-thickbox_default/kettlebell-backward-lunge.jpg",
                rep: "1x10x15",
                timed: false,
              },
            ],
          });
          newWorkout2.save();
          let newWorkout3 = new Workout({
            id: req.query.id,
            program: req.query.program,
            name: "Workout 2",
            img: "https://static-00.iconduck.com/assets.00/leg-emoji-1851x2048-p3ci1djr.png",
            status: "lock",
            status2: "lock",
            exerciseList: [
              {
                name: "Deadlift",
                img: "https://cdn.shopify.com/s/files/1/0252/3155/6686/files/How_To_Do_a_Trap_Bar_Deadlift_Step-by-Step.jpg?v=1718189658",
                rep: "1x5x60",
                timed: false,
              },
              {
                name: "Weighted Box Step-Ups",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTJBPWhx_AwTnMqep9Dij1WW20JZ3a03AGQ&s",
                rep: "2x10x15",
                timed: false,
              },
              {
                name: "Wall Sit",
                img: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Wall-Sit.png",
                rep: "30 seconds",
                timed: true,
              },
            ],
          });
          newWorkout3.save();
          let newWorkout4 = new Workout({
            id: req.query.id,
            program: req.query.program,
            name: "Final Workout",
            img: "https://cdn-icons-png.flaticon.com/512/1599/1599789.png",
            status: "lock",
            status2: "lock",
            exerciseList: [
              {
                name: "Medicine Ball Squats",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMbOaCf7h1koSwH5WzYtEBDut0sl4rKaYQg&s",
                rep: "2x10x15",
                timed: false,
              },
              {
                name: "Russian Twist",
                img: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
                rep: "2x10x15",
                timed: false,
              },
              {
                name: "Squat Jumps",
                img: "https://liftmanual.com/wp-content/uploads/2023/04/jump-squat.jpg",
                rep: "1x10",
                timed: false,
              },
              {
                name: "Alternating Kettlebell Lunges",
                img: "https://gymvisual.com/14209-thickbox_default/kettlebell-backward-lunge.jpg",
                rep: "1x10x15",
                timed: false,
              },
              {
                name: "Deadlift",
                img: "https://cdn.shopify.com/s/files/1/0252/3155/6686/files/How_To_Do_a_Trap_Bar_Deadlift_Step-by-Step.jpg?v=1718189658",
                rep: "1x5x60",
                timed: false,
              },
              {
                name: "Weighted Box Step-Ups",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTJBPWhx_AwTnMqep9Dij1WW20JZ3a03AGQ&s",
                rep: "2x10x15",
                timed: false,
              },
              {
                name: "Wall Sit",
                img: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Wall-Sit.png",
                rep: "30 seconds",
                timed: true,
              },
            ],
          });
          newWorkout4.save();
          res.send([newWorkout1, newWorkout2, newWorkout3, newWorkout4]);
        }
      }
    }
  );
});

router.post("/start", (req, res) => {
  // console.log("did you work");
  Workout.findOne({
    id: req.body.id,
    program: req.body.program,
    name: req.body.name,
  }).then((obj) => {
    obj.status = "ongoing";
    obj.save();
    res.send(obj);
  });
});

router.get("/start", (req, res) => {
  Workout.findOne({
    id: req.query.id,
    program: req.query.program,
    status: req.query.status,
  }).then((obj) => {
    res.send(obj);
  });
});

router.post("/clear", (req, res) => {
  Workout.findOne({
    id: req.body.id,
    program: req.body.program,
    name: req.body.name,
  }).then((obj) => {
    obj.status = "clear";
    obj.status2 = "clear";
    obj.save();
  });

  if (req.body.name === "Warm-Up") {
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 1",
    }).then((obj) => {
      if (obj.status === "lock") {
        obj.status = "unlock";
        obj.status2 = "unlock";
      }
      obj.save();
    });
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 2",
    }).then((obj) => {
      if (obj.status === "lock") {
        obj.status = "unlock";
        obj.status2 = "unlock";
      }
      obj.save();
    });
  } else if (req.body.name === "Workout 1") {
    Workout.findOne({
      id: req.body.id,
      program: req.body.program,
      name: "Workout 2",
    }).then((obj) => {
      if (obj.status === "clear") {
        Workout.findOne({
          id: req.body.id,
          program: req.body.program,
          name: "Final Workout",
        }).then((obj) => {
          if (obj.status === "lock") {
            obj.status = "unlock";
            obj.status2 = "unlock";
          }
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
          if (obj.status === "lock") {
            obj.status = "unlock";
            obj.status2 = "unlock";
          }
          obj.save();
        });
      }
    });
  }
  setTimeout(() => {
    res.send({});
  }, 500);
});

router.post("/reset", (req, res) => {
  Workout.find({
    id: req.body.id,
    program: req.body.program,
  }).then((existingWorkouts) => {
    for (let i = 0; i < existingWorkouts.length; i++) {
      if (existingWorkouts[i].name === "Warm-Up") {
        existingWorkouts[i].status = "unlock";
        existingWorkouts[i].status2 = "unlock";
      } else {
        existingWorkouts[i].status = "lock";
        existingWorkouts[i].status2 = "lock";
      }
      existingWorkouts[i].save();
    }
    res.send({ message: "RESET ALL" });
  });
});

router.post("/exit", (req, res) => {
  Workout.findOne({
    id: req.body.id,
    program: req.body.program,
    name: req.body.name,
  }).then((obj) => {
    obj.status = obj.status2;
    obj.save();
    res.send({ message: "EXIT" });
  });
});

// router.post("/delete", (req, res) => {
//   Workout.deleteMany({});
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
