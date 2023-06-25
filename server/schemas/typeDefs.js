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

input BookInput {
  bookId: String!
  authors: [String]
  title: String!
  description: String!
  image: String
  link: String
}

type Query {
  tech:[Tech]!
  getUser: User
}

type Mutation {
  createUser( username: String!, email: String!, password: String!) : User
  loginUser(email: String!, password: String!) : User
  saveBook(book: BookInput!) : User
  removeBook( bookId: String!) : User
}
`;

module.exports = typeDefs;
