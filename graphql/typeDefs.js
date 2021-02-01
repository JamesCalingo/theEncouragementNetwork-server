const { gql } = require("apollo-server");

module.exports = gql`
  type Message {
    id: ID!
    body: String!
    createdAt: String!
    user: String!
    likes: Int
    flagged: Boolean
  }

  type User {
    id: ID!
    email: String!
    token: String!
    password: String!
    flagged: Boolean
  }

  input Registration {
    email: String!
    password: String!
    confirmPW: String!
  }

  type Query {
    getMessages: [Message]
    getMessagesByLikes: [Message]
    getMessageByID(messageID: ID!): Message
  }

  type Mutation {
    register(registration: Registration): User!
    login(email: String!, password: String!): User!
    postMessage(body: String!): Message!
    likeMessage(messageID: ID!): Message!
    reportMessage(messageID: ID!): Message!
    deleteMessage(messageID: ID!): String!
  }
`;
