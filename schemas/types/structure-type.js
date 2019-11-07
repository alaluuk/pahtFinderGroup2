const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

const StructureTypeType = new GraphQLObjectType({
  name: "StructureType",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.StructureTypeType = StructureTypeType;