import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(
    username: $username, 
    email: $email, 
    password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
      }
    }
  }
}
`;

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}
`;

export const SAVE_BOOK = gql`
    mutation Mutation($authors: [String], $description: String, $link: String, $title: String, $bookId: String, $image: String) {
  saveBook(authors: $authors, description: $description, link: $link, title: $title, bookId: $bookId, image: $image) {
    _id
    username
    email
    password
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: String!) {
  removeBook(bookId: $bookId) {
    username
    _id
    email
  }
}
`;
