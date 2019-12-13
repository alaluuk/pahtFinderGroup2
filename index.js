require('dotenv').config();
const path = require("path");
const express = require("express");
const expressGraphQl = require("express-graphql");
const expressJWT = require("express-jwt");
const cors = require("cors");
const { logger } = require("./log-adaptor");
const { GraphQLSchema, printSchema } = require("graphql");
const { RootQuery } = require("./schemas/root-query");
const { RootMutation } = require("./schemas/root-mutation");

const PORT = process.env.PORT || 5000;

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

if(process.env.NODE_ENV !== 'production') {
  console.log("-- GraphQL Schema (Start) --");
  console.log(printSchema(schema));
  console.log("-- GraphQL Schema (End) --");
}

logger.info("Server started on port %s.", PORT, { service: 'nodejs' });

var app = express();
app.use(cors());
app.use('/admin', express.static(path.join(__dirname, './admin-frontend/build')))
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.use(
  "/graphql",
  expressJWT({
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    credentialsRequired: false,
    requestProperty: 'auth'
  }),
  expressGraphQl({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: function(err) {
      logger.error("GraphQL error: %s", err, { service: 'nodejs-graphql' });
      return {
        message: err.message,
        locations: err.locations,
        stack: (err.stack && process.env.NODE_ENV !== 'production') ? err.stack.split('\n') : [],
        path: (process.env.NODE_ENV !== 'production') ? err.path : undefined,
      };
    }
  }),
  function(err, req, res, next) {
    logger.error("Express error: %s", err, { service: 'nodejs-express' });
    res.setHeader("Content-Type", "application/json");
    res.status(500);
    res.send(JSON.stringify({ errors: [ err ] }));
  }
);

app.get('admin/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/admin-frontend/build/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.listen(PORT, () => console.log(`Express is listening on ${ PORT }`));