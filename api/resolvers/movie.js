const Movie = require('../../models/movie');

module.exports = {
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
}
