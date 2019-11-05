const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const StructureTypeType = new GraphQLObjectType({
  name: "StructureType",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.StructureTypeType = StructureTypeType;