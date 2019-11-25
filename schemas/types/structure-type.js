const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

const StructureTypeType = new GraphQLObjectType({
  name: "StructureType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.StructureTypeType = StructureTypeType;