const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  cars: [Car]
  car(id: ID!): Car
}

type Car {
  id: ID!
  make: String
  model: String
  year: Int
  colour: String
  speed: Int
}
`

module.exports = typeDefs;
 
// cars(pageSize: Int, after: String): CarConnection! 
/*
type CarConnection {
  cursor: String!
  hasMore: Boolean!
  cars: [Car]!
}
*/