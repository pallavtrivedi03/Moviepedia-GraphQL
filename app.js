const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const apiSchema = require('./api/schema/index');
const apiResolvers = require('./api/resolvers/index');
var app = express();

app.use(bodyParser.json());

app.use('/api', graphqlHttp({
    schema: apiSchema,
    rootValue: apiResolvers,
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

