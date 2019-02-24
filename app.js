const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const mongoose = require('mongoose');
const movieSchema = require('./models/movie-schema');
const Movie = require('./models/movie');

var app = express();

app.use(bodyParser.json());

app.use('/api', graphqlHttp({
    schema: buildSchema(movieSchema.movieBuildSchema),
    rootValue: {
        movies: () => {
            return Movie.find()
            .then(movies => {
                return movies.map(movie => {
                    return { ...movie._doc, _id: movie._doc._id.toString()};        //overwriting id 
                });
            })
            .catch(err => {
                throw err;
            });
        },
        createMovie: (args) => {
            const movie = new Movie({
                title: args.movieInput.title,                
                year: +args.movieInput.year,
                released: args.movieInput.released,
                genre: args.movieInput.genre,
                director: args.movieInput.director,
                actors: args.movieInput.actors,
                plot: args.movieInput.plot,
                poster: args.movieInput.poster,
                imdbRating: +args.movieInput.imdbRating,
                language: args.movieInput.language,
                runtime: args.movieInput.runtime
            });
            return movie
            .save()
            .then(result => {
                console.log(result);
                return {...result._doc, _id: result._doc._id.toString()};        // spread operator. _doc is provided by mongoose to get our properties and not meta data
            }).catch(err => {
                console.log(err);
                throw err;
            });
        }
    },
    graphiql: true
})
);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0-rvv86.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    ).then(() => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);    
    });

