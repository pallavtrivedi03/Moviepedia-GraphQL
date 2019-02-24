module.exports = {'movieBuildSchema':`
type Movie {
    _id: ID!
    title: String!
    year: Int!
    released: String!
    genre: String!
    director: String!
    actors: String!
    plot: String!
    poster: String!
    imdbRating: Float!
    language: String!
    runtime: Int!
}

input MovieInput {
    title: String!
    year: Int!
    released: String!
    genre: String!
    director: String!
    actors: String!
    plot: String!
    poster: String!
    imdbRating: Float!
    language: String!
    runtime: Int!
}

type RootQuery {
    movies: [Movie!]!
}

type RootMutation {
    createMovie(movieInput: MovieInput): Movie
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`}; 