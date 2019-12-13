const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");
const { NonReportableStructureTemplateType } = require(".");

const StructureEfficiencyReportSegmentType = new GraphQLObjectType({
  name: "StructureEfficiencyReportSegment",
  fields: {
    label: { type: new GraphQLNonNull(GraphQLString) },
    from: { type: new GraphQLNonNull(GraphQLFloat) },
    to: { type: new GraphQLNonNull(GraphQLFloat) },
    count: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const StructureEfficiencyReportRankingType = new GraphQLObjectType({
  name: "StructureEfficiencyReportRanking",
  fields: {
    percentage: { type: new GraphQLNonNull(GraphQLFloat) },
    rank: { type: new GraphQLNonNull(GraphQLInt) },
    count: { type: new GraphQLNonNull(GraphQLInt) },
    rankedSegment: { type: new GraphQLNonNull(StructureEfficiencyReportSegmentType) }
  }
});

const StructureEfficiencyReportRecommendationType = new GraphQLObjectType({
  name: "StructureEfficiencyReportRecommendation",
  fields: {
    upgradePercentage: { type: new GraphQLNonNull(GraphQLFloat) },
    upgradeUValue:  { type: new GraphQLNonNull(GraphQLFloat) },
    upgradePrice: { type: GraphQLFloat },
    upgradePPR: { type: GraphQLFloat },
    structureTemplate: { type: new GraphQLNonNull(NonReportableStructureTemplateType) }
  }
});

const StructureEfficiencyReportType = new GraphQLObjectType({
  name: "StructureEfficiencyReport",
  fields: {
    ranking: { type: new GraphQLNonNull(StructureEfficiencyReportRankingType) },
    segmentation: { type: new GraphQLList(StructureEfficiencyReportSegmentType) },
    recommendations: { type: new GraphQLList(StructureEfficiencyReportRecommendationType) },
    mostEfficientOfType: { type: new GraphQLNonNull(NonReportableStructureTemplateType) },
    leastEfficientOfType: { type: new GraphQLNonNull(NonReportableStructureTemplateType) }
  }
});

exports.StructureEfficiencyReportSegmentType = StructureEfficiencyReportSegmentType;
exports.StructureEfficiencyReportRankingType = StructureEfficiencyReportRankingType;
exports.StructureEfficiencyReportRecommendationType = StructureEfficiencyReportRecommendationType;
exports.StructureEfficiencyReportType = StructureEfficiencyReportType;