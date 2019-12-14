const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat, GraphQLBoolean } = require("graphql");
const { UserType, HouseStructureType, HouseEfficiencyReportType } = require(".");

const HouseType = new GraphQLObjectType({
  name: "House",
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
    efficiencyReport: { type: new GraphQLNonNull(HouseEfficiencyReportType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.HouseType = HouseType;