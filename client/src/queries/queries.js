import { gql } from 'apollo-boost';

export const getAllBooks  = gql`
{
  books{
    id
    name
    genre
  }
}`;

export const getAllAuthors  = gql`
  {
    authors{
      id
      name
    }
  }`;

export const getBook = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      author{
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`;