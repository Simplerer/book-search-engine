import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Query($username: String) {
  me(username: $username) {
    username
    _id
    email
    password
    savedBooks {
      title
      bookId
      description
      authors
      image
      link
    }
  }
}
`;

// exporting API search of books
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};