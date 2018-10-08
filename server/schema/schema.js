const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const _  = require('lodash');


let dummyData = [
  {id: '1', name: 'HP1', genre: 'Fantasy', authorId: '1'},
  {id: '2', name: 'Eragon', genre: 'Fantasy', authorId: '2'},
  {id: '3', name: 'Artemis Fowl', genre: 'Fantasy', authorId: '3'},
  {id: '1', name: 'HP2', genre: 'Fantasy', authorId: '1'},
  {id: '2', name: 'Elder', genre: 'Fantasy', authorId: '2'},
  {id: '3', name: 'Artemis Fowl 2', genre: 'Fantasy', authorId: '3'}
];

let dummyAuthor = [
  {name: 'J.K. Rowling', age: 50, id: '1'},
  {name: 'Christopher Paolini', age: 44, id: '2'},
  {name: 'Eoin Colfer', age: 55, id: '3'}
];


// Relating the two types, parent is the book object that is returned
// which is used to the query object
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(dummyAuthor, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    id: {type: GraphQLID},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return dummyData.filter((book) => {
          return book.authorId === parent.id;
        });
      }
    }
  })
});


// RootQuery defines how we can jumo into the graph to query it
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { 
          id: {
              type: GraphQLID
            }
        },
      resolve(parent, args) {
        // code to get data from db
        return _.find(dummyData, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {
          id: {
            type: GraphQLID
          },
        },
        resolve(parent, args) {
          return _.find(dummyAuthor, {id: args.id});
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});