const express = require('express');
const PORT = process.env.PORT || 3000;
const graphqlHTTP = require('express-graphql');

const app = express();
const graphqlSchema = {}; // Schema def?

app.use('/graphql', graphqlHTTP(graphqlSchema));

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});