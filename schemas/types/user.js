const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
// const { HouseType } = require("./house");

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    permissions: { type: new GraphQLList(GraphQLString) },
    // houses: { type: new GraphQLList(HouseType) }
  }
});

exports.UserType = UserType;