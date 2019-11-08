const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLFloat, GraphQLString } = require("graphql");
const { StructureType } = require(".");

const HouseStructureType = new GraphQLObjectType({
    name: "HouseStructure",
    type: "Query",
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      structure: { type: new GraphQLNonNull(StructureType) },
      area: { type: GraphQLFloat },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      updatedAt: { type: new GraphQLNonNull(GraphQLString) }
    }
  });

exports.HouseStructureType = HouseStructureType;