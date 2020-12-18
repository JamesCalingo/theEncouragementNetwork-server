const express = require('express')
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const dbLink = process.env.mongoLink;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/messages");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express()





const PORT = process.env.PORT || 3001;

mongoose
  .connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
    return server.applyMiddleware({app, path: PORT });
  })
  .then((res) => {
    console.log(`server running`);
  })
  .catch( err => {
    console.log(err)
  });
