const { gql } = require("apollo-server");

module.exports = gql`
  type Message {
    id: ID!
    body: String!
    createdAt: String!
    likes: Int
    flagged: Boolean
  }
  type Query {
    getMessages: [Message]
    getMessagesByLikes: [Message]
    getMessageByID(messageID: ID!): Message
  }

  type Mutation {
    postMessage(body: String!): Message!
    likeMessage(messageID: ID!): Message!
    reportMessage(messageID: ID!): Message!
    deleteMessage(messageID: ID!): String!
  }
`;
