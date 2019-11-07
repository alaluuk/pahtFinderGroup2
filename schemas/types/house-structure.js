const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLFloat } = require("graphql");
const { StructureType } = require(".");

const HouseStructureType = new GraphQLObjectType({
    name: "HouseStructure",
    type: "Query",
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      structure: { type: new GraphQLNonNull(StructureType) },
      area: { type: GraphQLFloat }
    }
  });

exports.HouseStructureType = HouseStructureType;