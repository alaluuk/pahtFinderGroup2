const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");
const { UserType } = require(".");

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  // description: "A payload used to transfer authentification tokens and user information.",
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) }
  }
});

exports.AuthPayloadType = AuthPayloadType;