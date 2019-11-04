const express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const path = require('path');
const PORT = process.env.PORT || 5000;

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT, () => console.log(`Express is listening on ${ PORT }`));