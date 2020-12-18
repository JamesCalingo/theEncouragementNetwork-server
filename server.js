const express = require('express')
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const dbLink = process.env.mongoLink;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/messages");

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "http://localhost/3000",
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

mongoose
  .connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch( err => {
    console.log(err)
  });

  server.applyMiddleware({app, path: PORT, cors: false})
  
  app.listen({port: PORT}, () => {
    console.log(`running on ${PORT}`)
  }
  )
  