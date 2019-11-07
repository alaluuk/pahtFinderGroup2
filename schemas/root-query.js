const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } = require("graphql");
const { UserType, HouseType } = require("./types");
const { User } = require("../models");
const { House } = require("../models");
const { checkPermission } = require("../permissions");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, args, { user }) {
        if(!user) throw new Error("You must be logged in to perform this action.");
        if(args.id) {
          if(!checkPermission(user.role, "user_query_self")) {
            throw new Error("You don't have sufficient permissions to query this user.");
          }
          return [ User.getOne(args.id) ];
        } else {
          if(!checkPermission(user.role, "user_query_other")) {
            // TODO: Instead limit the output to only the user himself
            throw new Error("You don't have sufficient permissions to query other users.");
          }
          return User.getAny();
        }
      }
    },
    houses: {
      type: new GraphQLList(HouseType),
      args: {
        id: { type: GraphQLID },
        owner_id: { type: GraphQLID }
      },
      resolve(parentValue, args, { user }) {
        if(!user) throw new Error("You must be logged in to perform this action.");
        if(args.id) {
          if(!checkPermission(user.role, "house_query_owner_self")) {
            throw new Error("You don't have sufficient permissions to query this user.");
          }
          return [ House.getOne(args.id) ];
        } else if(args.owner_id) {
          if(args.owner_id !== user.id && !checkPermission(user.role, "house_query_owner_other")) {
            throw new Error("You don't have sufficient permissions to query houses that are owned by others.");
          }
          return House.getAnyByOwner(args.owner_id);
        } else {
          if(!checkPermission(user.role, "house_query_owner_other")) {
            return House.getAnyByOwner(args.owner_id);
          }
          return House.getAny();
        }
      }
    }
  }
});

exports.RootQuery = RootQuery;