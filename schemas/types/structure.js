const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");
const { StructureMaterialType } = require("./structure-material");
const { StructureTypeType } = require("./structure-type");

const StructureType = new GraphQLObjectType({
  name: "Structure",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    type: { type: new GraphQLNonNull(StructureTypeType) },
    uValue: { type: GraphQLFloat },
    material: { type: StructureMaterialType }
  }
});

exports.StructureType = StructureType;