const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");
const { UserType } = require(".");

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  type: "Query",
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) }
  }
});

exports.AuthPayloadType = AuthPayloadType;