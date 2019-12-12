const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { APIQuery, User, House, StructureType: StructureTypeModel, StructureTemplate, HouseStructure } = require("../models");
const { QueryType, UserType, HouseType, StructureTypeType, StructureTemplateType } = require("./types");
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
          return new Promise(function(resolve, reject) {
            House.getOne(args.id)
              .then(house => {
                if(house._owner_id !== auth.user.id && !checkPermission(auth.user.role, "house_query_owner_other")) {
                  throw new Error("You don't have sufficient permissions to query this house.");
                } else if(house._owner_id === auth.user.id && !checkPermission(auth.user.role, "house_query_owner_self")) {
                  throw new Error("You don't have sufficient permissions to query this house.");
                }
                resolve([ house ]);
              })
              .catch(err => reject(err));
          });
        } else if(args.ownerID) {
          if(args.ownerID !== auth.user.id && !checkPermission(auth.user.role, "house_query_owner_other")) {
            throw new Error("You don't have sufficient permissions to query houses that are owned by others.");
          }
          return House.getAnyByOwner(args.ownerID);
        } else {
          if(!checkPermission(auth.user.role, "house_query_owner_other")) {
            return House.getAnyByOwner(auth.user.id);
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
    houseStructures: {
      type: new GraphQLList(StructureTemplateType),
      args: {
        id: { type: GraphQLID },
        houseID: { type: GraphQLID },
        structureTypeID: { type: GraphQLID }
      },
      resolve: async(_, args, { auth }) => {
        if(!auth.user) throw new Error("You must be logged in to perform this action.");
        if(args.id) {
          let houseStructure = await HouseStructure.getOne(args.id);
          let house = await houseStructure.house;
          if(house._owner_id !== auth.user.id && !checkPermission(auth.user.role, "house_structures_query_owner_other")) {
            throw new Error("You don't have sufficient permissions to query structures of houses you don't own.");
          } else if(house._owner_id === auth.user.id && !checkPermission(auth.user.role, "house_structures_query_owner_self")) {
            throw new Error("You don't have sufficient permissions to query structures of houses you own.");
          }
          resolve([ houseStructure ]);
        } else if(args.houseID) {
          let house = await House.getOne(args.houseID);
          if(house._owner_id !== auth.user.id && !checkPermission(auth.user.role, "house_structures_query_owner_other")) {
            throw new Error("You don't have sufficient permissions to query structures of houses you don't own.");
          } else if(house._owner_id === auth.user.id && !checkPermission(auth.user.role, "house_structures_query_owner_self")) {
            throw new Error("You don't have sufficient permissions to query structures of houses you own.");
          }
          return HouseStructure.getAnyByHouse(args.houseID, args.structureTypeID);
        } else {
          throw new Error("You have to specify a unique id for the house structure or a house id with optional structure type filter.");
        }
      }
    }
  }
});

exports.RootQuery = RootQuery;