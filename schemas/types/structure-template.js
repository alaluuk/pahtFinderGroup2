const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } = require("graphql");
const { StructureTypeType, EfficiencyReportType } = require(".");

const StructureTemplateType = new GraphQLObjectType({
  name: "StructureTemplate",
  type: "Query",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    type: { type: new GraphQLNonNull(StructureTypeType) },
    uValue: { type: GraphQLFloat },
    area: { type: GraphQLFloat },
    manufacturer: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    productionYear: { type: GraphQLInt },
    efficiencyReport: { type: new GraphQLNonNull(EfficiencyReportType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.StructureTemplateType = StructureTemplateType;