const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat } = require("graphql");
const { HouseStructure, House } = require("../../models");
const { HouseStructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseStructureUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  houseId: Joi.string().guid(),
  structureId: Joi.string().guid(),
  area: Joi.number()
});

const HouseStructureUpdateMutation = {
  type: HouseStructureType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    houseId: { type: GraphQLID },
    structureId: { type: GraphQLID },
    area: { type: GraphQLFloat }
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseStructureUpdateSchema);
    if(!checkPermission(auth.user.role, "house_structure_update")) {
      throw new Error("You don't have sufficient permissions to edit house structures.");
    }
    return new Promise(function(resolve, reject) {
      HouseStructure.getOne(values.id)
        .then(house_structure => {
          House.getOne(values.houseId)
            .then(house => {
              if(house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_structure_update_owner_self")) {
                throw new Error("You don't have sufficient permissions to update structures from houses you own.");
              }
              if(house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_structure_update_owner_other")) {
                throw new Error("You don't have sufficient permissions to update structures from houses you don't own.");
              }
              house_structure.save()
                .then(success => resolve(structure))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.HouseStructureUpdateSchema = HouseStructureUpdateSchema;
exports.HouseStructureUpdateMutation = HouseStructureUpdateMutation;