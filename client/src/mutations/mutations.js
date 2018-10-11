import { gql } from 'apollo-boost';

// Variable naming convention: $<varName>: <objectType>! (! means required, non null!)
export const addBook = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
      genre
    }
  }
`;