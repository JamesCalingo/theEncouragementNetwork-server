const express = require('express')
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require ('cors')
require("dotenv").config();

const dbLink = process.env.mongoLink;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/messages");

const app = express()


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  cors: {
    origin: "*",
    credentials: true
  }
});

app.use(cors())
app.get('/graphql')
server.applyMiddleware({ app })

const PORT = process.env.PORT || 3001;

mongoose
  .connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch( err => {
    console.log(err)
  });
  
  app.listen({port: PORT}, () => {
    console.log(`running on ${PORT}`)
  }
  )
  