const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { UserType } = require("./user");
const { HouseStructureType } = require("./house-structure");

const HouseType = new GraphQLObjectType({
  name: "House",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    owner: { type: new GraphQLNonNull(UserType) },
    countryCode: { type: GraphQLString },
    constructionYear: { type: GraphQLInt },
    structures: { type: new GraphQLList(HouseStructureType) }
  }
});

exports.HouseType = HouseType;

