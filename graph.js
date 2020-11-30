const { gql } = require('apollo-server-fastify')

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
    time: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    time: () => {

      return (new Date()).toString()
    }
  }
}

module.exports = {
    typeDefs,
    resolvers
}
