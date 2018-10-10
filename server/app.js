const express = require('express');
const PORT = process.env.PORT || 3000;
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const schema = require('./schema/schema');

// Allow cross origin req
app.use(cors());

// db connection
mongoose.connect('mongodb://sai:test123@ds117773.mlab.com:17773/reading_list_db');
mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});