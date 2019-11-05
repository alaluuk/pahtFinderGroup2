const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLFloat } = require("graphql");
const { StructureType } = require("./structure");

const HouseStructureType = new GraphQLObjectType({
    name: "HouseStructure",
    type: "Query",
    fields: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      structure: { type: new GraphQLNonNull(StructureType) },
      area: { type: GraphQLFloat }
    }
  });

exports.HouseStructureType = HouseStructureType;