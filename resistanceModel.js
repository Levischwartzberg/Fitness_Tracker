const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
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

    weight: {
        type: Number,
        trim: true,
        required: "Exercise weight is required"
    },

    reps: {
        type: Number,
        trim: true,
        required: "Exercise reps is required"
    },

    sets: {
        type: Number,
        trim: true,
        required: "Exercise sets is required"
    },

    resistanceCreated: {
        type: Date,
        default: Date.now
    }
});

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;