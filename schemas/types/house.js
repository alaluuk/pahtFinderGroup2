const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat, GraphQLBoolean } = require("graphql");
const { UserType, HouseStructureType } = require(".");

const HouseType = new GraphQLObjectType({
  name: "House",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    owner: { type: new GraphQLNonNull(UserType) },
    addressCountry: { type: GraphQLString },
    addressCity: { type: GraphQLString },
    addressStreet: { type: GraphQLString },
    addressLat: { type: GraphQLFloat },
    addressLng: { type: GraphQLFloat },
    constructionYear: { type: GraphQLInt },
    heatingSystem: { type: GraphQLString },
    costOfHeating: { type: GraphQLFloat },
    warmWaterPipe: { type: GraphQLBoolean },
    structures: { type: new GraphQLList(HouseStructureType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.HouseType = HouseType;