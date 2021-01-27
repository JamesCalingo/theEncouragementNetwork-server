const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require("dotenv").config()

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const mongoLink = process.env.mongoLink;



const PORT = process.env.port || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(mongoLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
