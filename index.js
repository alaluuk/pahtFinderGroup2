require('dotenv').config();
const path = require("path");
const express = require("express");
const expressGraphQl = require("express-graphql");
const expressJWT = require("express-jwt");
const cors = require("cors");
const { GraphQLSchema, printSchema } = require("graphql");
const { RootQuery } = require("./schemas/root-query");
const { RootMutation } = require("./schemas/root-mutation");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

if(process.env.NODE_ENV === 'development') {
  console.log("-- GraphQL Schema (Start) --");
  console.log(printSchema(schema));
  console.log("-- GraphQL Schema (End) --");
}

var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(
  "/graphql",
  expressJWT({
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    credentialsRequired: false
  }),
  expressGraphQl({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: (process.env.NODE_ENV === 'development') ? error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path,
    }) : undefined
  }),
  function(err, req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.status(500);
    res.send(JSON.stringify({ errors: [ err ] }));
  }
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express is listening on ${ PORT }`));