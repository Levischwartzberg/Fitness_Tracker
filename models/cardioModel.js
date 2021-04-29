const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardioSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Exercise type is required"
    },

    name: {
        type: String,
        trim: true,
        required: "Exercise name is required"
    },

    duration: {
        type: Number,
        trim: true,
        required: "Exercise duration is required"
    },

    distance: {
        type: Number,
        trim: true,
        required: "Exercise distance is required"
    },

    cardioCreated: {
        type: Date,
        default: Date.now
    }
});

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;