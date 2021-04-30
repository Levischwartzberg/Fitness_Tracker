const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
// const Workout = require("./models/workoutModel.js");
// const Exercise = require("./models/exerciseModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

app.post("/api/workouts", ({ body }, res) => {
  console.log("test")
  db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  const id = req.params.id;
  console.log(id)
  db.Exercise.create(req.body)
    .then((exercise) => db.Workout.findOneAndUpdate({_id: id}, { $push: { exercises: exercise } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }