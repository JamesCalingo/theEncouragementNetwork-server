const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const dbLink = process.env.mongoLink;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/messages");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

mongoose
  .connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running on ${res.url}`);
  })
  .catch( err => {
    console.log(err)
  });
