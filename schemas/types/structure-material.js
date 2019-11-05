const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");

const StructureMaterialType = new GraphQLObjectType({
  name: "StructureMaterial",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});

exports.StructureMaterialType = StructureMaterialType;