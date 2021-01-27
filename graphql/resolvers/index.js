const messageResolvers = require('./messages')
const userResolvers = require ('./users')

module. exports = {
  Query: {
    ...messageResolvers.Query
  },
  Mutation: {
    ...messageResolvers.Mutation,
    ...userResolvers.Mutation
  }
}