const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;
const _  = require('lodash');


let dummyData = [
  {name: 'HP1', genre: 'Fantasy', id: '1'},
  {name: 'Eragon', genre: 'Fantasy', id: '2'},
  {name: 'Artemis Fowl', genre: 'Fantasy', id: '3'}
];

let dummyAuthor = [
  {name: 'J.K. Rowling', age: 50, id: '1'},
  {name: 'Christopher Paolini', age: 44, id: '2'},
  {name: 'Eoin Colfer', age: 55, id: '3'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    id: {type: GraphQLID}
  })
});

// {
//   book (id: "123"){ // args of type String
//     name
//     genre
//   }
// }

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
        // id: {
        //   type: GraphQLID
        // },
        name: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return _.find(dummyAuthor, {name: args.name});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});