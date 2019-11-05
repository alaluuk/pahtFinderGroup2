const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { UserType, HouseType } = require("./types");
const { User } = require("../models/user");
const { House } = require("../models/house");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve(parentValue, args) { return User.getMany(); }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) { return User.getOne(args.id); }
    },
    houses: {
      type: new GraphQLList(HouseType),
      args: {},
      resolve(parentValue, args) { return House.getMany(); }
    },
    house: {
      type: HouseType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) { return House.getOne(args.id); }
    }
  }
});

exports.query = RootQuery;