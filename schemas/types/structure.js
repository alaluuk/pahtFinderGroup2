const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = require("graphql");
const { StructureMaterialType, StructureTypeType } = require(".");

const StructureType = new GraphQLObjectType({
  name: "Structure",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    type: { type: new GraphQLNonNull(StructureTypeType) },
    uValue: { type: GraphQLFloat },
    material: { type: StructureMaterialType }
  }
});

exports.StructureType = StructureType;