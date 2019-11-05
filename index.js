require('dotenv').config();
const path = require("path");
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

const schema = new GraphQLSchema({
  query,
  mutation
});

var app = express();
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use('/graphql', expressGraphQl({
  schema: schema,
  graphiql: true,
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express is listening on ${ PORT }`));