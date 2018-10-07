const express = require('express');
const PORT = process.env.PORT || 3000;
const graphqlHTTP = require('express-graphql');

const app = express();
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});