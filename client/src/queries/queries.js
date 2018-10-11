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