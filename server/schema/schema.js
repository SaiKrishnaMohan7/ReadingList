const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const BookSchema = {
  name: GraphQLString,
  fields: () => ({
    id: GraphQLString,
    name: GraphQLString,
    genre: GraphQLString
  })
};

const BookType = new GraphQLObjectType(BookSchema);