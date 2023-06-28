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
  password: String
  savedBooks: [Book]!
  bookCount: Int!
}

type Auth {
  token: ID!
  user: User
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
  me: User
}

type Mutation {
  createUser( username: String!, email: String!, password: String!): Auth
  loginUser(email: String!, password: String!) : Auth
  saveBook(bookData: BookInput!) : User
  removeBook( bookId: String!) : User
}
`;

module.exports = typeDefs;
