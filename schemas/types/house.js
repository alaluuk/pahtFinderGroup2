const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const { UserType, HouseStructureType } = require(".");

const HouseType = new GraphQLObjectType({
  name: "House",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    owner: { type: new GraphQLNonNull(UserType) },
    countryCode: { type: GraphQLString },
    constructionYear: { type: GraphQLInt },
    structures: { type: new GraphQLList(HouseStructureType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.HouseType = HouseType;