const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } = require("graphql");
const { APIQuery, User, House, StructureType: StructureTypeModel, StructureTemplate, StructureMaterial, Structure } = require("../models");
const { QueryType, UserType, HouseType, StructureTypeType, StructureTemplateType, StructureMaterialType, StructureType } = require("./types");
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
      resolve(_, args, { auth }) {
        if(!auth.user) throw new Error("You must be logged in to perform this action.");
        if(args.id) {
          if(!checkPermission(auth.user.role, "user_query_self")) {
            throw new Error("You don't have sufficient permissions to query this user.");
          }
          return [ User.getOne(args.id) ];
        } else {
          if(!checkPermission(auth.user.role, "user_query_other")) {
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
        ownerID: { type: GraphQLID }
      },
      resolve(_, args, { auth }) {
        if(!auth.user) throw new Error("You must be logged in to perform this action.");
        if(args.id) {
          if(!checkPermission(auth.user.role, "house_query_owner_self")) {
            throw new Error("You don't have sufficient permissions to query this user.");
          }
          return [ House.getOne(args.id) ];
        } else if(args.ownerID) {
          if(args.ownerID !== auth.user.id && !checkPermission(auth.user.role, "house_query_owner_other")) {
            throw new Error("You don't have sufficient permissions to query houses that are owned by others.");
          }
          return House.getAnyByOwner(args.ownerID);
        } else {
          if(!checkPermission(auth.user.role, "house_query_owner_other")) {
            return House.getAnyByOwner(args.ownerID);
          }
          return House.getAny();
        }
      }
    },
    structureTypes: {
      type: new GraphQLList(StructureTypeType),
      args: {
        id: { type: GraphQLID },
        query: { type: QueryType }
      },
      resolve(_, args, { auth }) {
        if(!auth.user) throw new Error("You must be logged in to perform this action.");
        if(!checkPermission(auth.user.role, "structure_type_query")) {
          throw new Error("You don't have sufficient permissions to query structure types.");
        }
        let query = (args.query) ? new APIQuery(args.query) : null;
        if(args.id) {
          return [ StructureTypeModel.getOne(args.id) ];
        } else {
          return StructureTypeModel.getAny(query);
        }
      }
    },
    structureTemplates: {
      type: new GraphQLList(StructureTemplateType),
      args: {
        id: { type: GraphQLID },
        query: { type: QueryType }
      },
      resolve(_, args, { auth }) {
        if(!auth.user) throw new Error("You must be logged in to perform this action.");
        if(!checkPermission(auth.user.role, "structure_template_query")) {
          throw new Error("You don't have sufficient permissions to query structure templates.");
        }
        let query = (args.query) ? new APIQuery(args.query) : null;
        if(args.id) {
          return [ StructureTemplate.getOne(args.id) ];
        } else {
          return StructureTemplate.getAny(query);
        }
      }
    },
    structures: {
      type: new GraphQLList(StructureType),
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, args, { auth }) {
        if(!auth.user) throw new Error("You must be logged in to perform this action.");
        if(!checkPermission(auth.user.role, "structures_query")) {
          throw new Error("You don't have sufficient permissions to query structures.");
        }
        if(args.id) {
          return [ Structure.getOne(args.id) ];
        } else {
          return Structure.getAny();
        }
      }
    },
  }
});

exports.RootQuery = RootQuery;