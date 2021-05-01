const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
// const Workout = require("./models/workoutModel.js");
// const Exercise = require("./models/exerciseModel.js");
const app = express();
const path = require("path");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

app.post("/api/workouts", ({ body }, res) => {
  console.log("create workout")
  db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

// app.put("/api/workouts/:id", (req, res) => {
//   console.log(req.body)
//   const id = req.params.id;
//   console.log(id)
//   db.Exercise.create(req.body)
//     .then((exercise) => db.Workout.findOneAndUpdate({_id: id}, { $push: { exercises: exercise } }, { new: true }))
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//   });
// });
app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  db.Workout.findByIdAndUpdate(
    {
      "_id": req.params.id
    }, 
    {
      $push: {exercises: req.body}
    },
    {
      new: true 
    }
  )
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

app.get("/exercise", async (req, res) => {
  // const workouts = await db.Workout.find({}).populate("exercises").catch( err => console.log(err) );

  // res.json({ result: "success", payload: workouts} )
  db.Workout.find({})

  res.sendFile(path.join(__dirname, './public/exercise.html'));
}) 


app.get("/exercise?", async (req, res) => {
  // const workouts = await db.Workout.find({}).populate("exercises").catch( err => console.log(err) );

  // res.json({ result: "success", payload: workouts} )
  db.Workout.find({})

  res.sendFile(path.join(__dirname, './public/exercise.html'));
}) 
// app.post("/api/workouts", (req, res) => {
//   db.Workout.create(req.body)
//   .then(dbWorkout => {
//     res.json(dbWorkout);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });

app.get("/api/workouts/range", async (req, res) => {
  // const workouts = await db.Workout.find({}).populate("exercises").catch( err => console.log(err) );

  // res.json({ result: "success", payload: workouts} )
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration" 
        }
      }
    }
  ])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });

})

app.get("/api/workouts", async (req, res) => {
  // const workouts = await db.Workout.find({}).populate("exercises").catch( err => console.log(err) );

  // res.json({ result: "success", payload: workouts} )
  db.Workout.find({})
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration" 
        }
      }
    }
  ])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }