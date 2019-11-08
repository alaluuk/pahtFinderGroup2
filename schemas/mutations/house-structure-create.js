const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID } = require("graphql");
const { HouseStructure, House } = require("../../models");
const { HouseStructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseStructureCreateSchema = Joi.object({
  houseId: Joi.string().guid().required(),
  structureId: Joi.string().guid().required(),
  area: Joi.number()
});

const HouseStructureCreateMutation = {
  type: HouseStructureType,
  args: {
    houseId: { type: new GraphQLNonNull(GraphQLID) },
    structureId: { type: new GraphQLNonNull(GraphQLID) },
    uValue: { type: GraphQLFloat }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(user.role, "house_structure_create")) {
      throw new Error("You don't have sufficient permissions to create house structures.");
    }
    let values = Joi.attempt(args, HouseStructureCreateSchema);
    return new Promise(function(resolve, reject) {
      House.getOne(values.houseId)
        .then(house => {
          if(house._owner_id == user.id && !checkPermission(user.role, "house_structure_create_owner_self")) {
            throw new Error("You don't have sufficient permissions to create structures for houses you own.");
          }
          if(house._owner_id != user.id && !checkPermission(user.role, "house_structure_create_owner_other")) {
            throw new Error("You don't have sufficient permissions to create structures for houses you don't own.");
          }
          HouseStructure.create(values.houseId, values.structureId, values.area)
            .then(house_structure => resolve(house_structure))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.HouseStructureCreateSchema = HouseStructureCreateSchema;
exports.HouseStructureCreateMutation = HouseStructureCreateMutation;