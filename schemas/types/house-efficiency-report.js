const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");
const { StructureTypeType } = require(".");

const HouseEfficiencyReportTotalType = new GraphQLObjectType({
  name: "HouseEfficiencyReportTotalType",
  fields: {
    structuresCount: { type: new GraphQLNonNull(GraphQLInt) },
    percentage: { type: GraphQLFloat },
    uValue: { type: GraphQLFloat },
    possibleUValue: { type: GraphQLFloat },
    costOfHeating: { type: GraphQLFloat },
    possibleCostOfHeating: { type: GraphQLFloat }
  }
});

const HouseEfficiencyReportTypeSpecificType = new GraphQLObjectType({
  name: "HouseEfficiencyReportTypeSpecificType",
  fields: {
    type: { type: new GraphQLNonNull(StructureTypeType) },
    structuresCount: { type: new GraphQLNonNull(GraphQLInt) },
    percentage: { type: new GraphQLNonNull(GraphQLFloat) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) },
    possibleUValue: { type: GraphQLFloat },
    costOfHeating: { type: GraphQLFloat },
    possibleCostOfHeating: { type: GraphQLFloat }
  }
});

const HouseEfficiencyReportType = new GraphQLObjectType({
  name: "HouseEfficiencyReport",
  fields: {
    total: { type: new GraphQLNonNull(HouseEfficiencyReportTotalType) },
    typeSpecific: { type: new GraphQLList(HouseEfficiencyReportTypeSpecificType) }
  }
});

exports.HouseEfficiencyReportTotalType = HouseEfficiencyReportTotalType;
exports.HouseEfficiencyReportTypeSpecificType = HouseEfficiencyReportTypeSpecificType;
exports.HouseEfficiencyReportType = HouseEfficiencyReportType;