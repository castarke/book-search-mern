const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]!
  bookCount: Int!
}
type Query {
  getUser: User
}

type Mutation {
  createUser:( username: String!, email: String!, password: String!) : User
  loginUser(email: String!, password: String!) : User
  saveBook(book: BookInput!) : User
  removeBook( bookId: String!) : User
}

`;

module.exports = typeDefs;
