const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");
// const { StructureTypeType } = require(".");

const EfficiencyReportSegmentType = new GraphQLObjectType({
  name: "EfficiencyReportSegment",
  type: "Query",
  fields: {
    label: { type: new GraphQLNonNull(GraphQLString) },
    from: { type: new GraphQLNonNull(GraphQLFloat) },
    to: { type: new GraphQLNonNull(GraphQLFloat) },
    count: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const EfficiencyReportRankingType = new GraphQLObjectType({
  name: "EfficiencyReportRanking",
  type: "Query",
  fields: {
    overallPercentage: { type: new GraphQLNonNull(GraphQLFloat) },
    overallRank: { type: new GraphQLNonNull(GraphQLInt) },
    overallCount: { type: new GraphQLNonNull(GraphQLInt) },
    rankedSegment: { type: new GraphQLNonNull(EfficiencyReportSegmentType) }
  }
});

const EfficiencyReportType = new GraphQLObjectType({
  name: "EfficiencyReport",
  type: "Query",
  fields: {
    ranking: { type: new GraphQLNonNull(EfficiencyReportRankingType) },
    segmentation: { type: new GraphQLList(EfficiencyReportSegmentType) },
    // bestOfType: { type: new GraphQLNonNull(StructureTemplateType) },
    // worstOfType: { type: new GraphQLNonNull(StructureTemplateType) }
  }
});

exports.EfficiencyReportSegmentType = EfficiencyReportSegmentType;
exports.EfficiencyReportRankingType = EfficiencyReportRankingType;
exports.EfficiencyReportType = EfficiencyReportType;