import {gql} from '@apollo/client';

export const GET_ME = gql`

    me {
      username
      _id
      email
      bookCount
      password
      savedBooks {
        bookId
        description
        image
        link
        title
        authors
      }
    }
  `