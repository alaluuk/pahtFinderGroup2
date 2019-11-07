const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLID } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    permissions: { type: new GraphQLList(GraphQLString) },
  }
});

exports.UserType = UserType;