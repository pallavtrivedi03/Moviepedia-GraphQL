const mongoose = require('mongoose');

const Schema = mongoose.Schema;     //constructor function

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    released : {
        type: String,
        required: true
    },
    genre : {
        type: String,
        required: true
    },
    director : {
        type: String,
        required: true
    },
    actors : {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster : {
        type: String,
        required: true
    },
    imdbRating : {
        type: Number,
        required: true
    },
    language : {
        type: String,
        required: true
    },
    runtime : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Movie',movieSchema);