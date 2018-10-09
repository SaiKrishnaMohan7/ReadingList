const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _  = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

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
        return Author.findById(parent.authorId);
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
        return Book.find({authorId: parent.id});
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
        return Book.findById(args.id);
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
          return Author.findById(args.id);
        }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(){
        return Author.find({});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(){
        return Book.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });

        // mongoose model returns saved obj, it'd be nice to see this on graphiql too hence return
        // or you see { "data": { "addAuthor": null } }
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });

        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});