const { GraphQLInputObjectType, GraphQLEnumType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInt } = require("graphql");

const QuerySortType = new GraphQLInputObjectType({
  name: "QuerySort",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    desc: { type: new GraphQLNonNull(GraphQLBoolean) }
  }
});

const QueryFilterTypeEnum = new GraphQLEnumType({
    name: "QueryFilterType",
    values: {
      EQUAL: { value: 'EQUAL' },
      NOT_EQUAL: { value: 'NOT_EQUAL' },
      LIKE: { value: 'LIKE' },
      BEGINS_WITH: { value: 'BEGINS_WITH' },
      ENDS_WITH: { value: 'ENDS_WITH' }
    }
});
const QueryFilterType = new GraphQLInputObjectType({
  name: "QueryFilter",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(QueryFilterTypeEnum) },
    value: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const QueryPaginationType = new GraphQLInputObjectType({
  name: "QueryPagination",
  fields: {
    pageSize: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const QueryType = new GraphQLInputObjectType({
  name: "Query",
  fields: {
    sort: { type: new GraphQLList(QuerySortType) },
    filter: { type: new GraphQLList(QueryFilterType) },
    pagination: { type: QueryPaginationType }
  }
});

exports.QueryType = QueryType;