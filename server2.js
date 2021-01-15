const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
require("dotenv").config()

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const mongoLink = process.env.mongoLink;

const pubsub = new PubSub();

const PORT = process.env.port || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(mongoLink, { useNewUrlParser: true })
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
