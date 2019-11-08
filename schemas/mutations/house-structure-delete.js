const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { HouseStructure, House } = require("../../models");
const { checkPermission } = require("../../permissions");

const HouseStructureDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const HouseStructureDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseStructureDeleteSchema);
    if(!checkPermission(user.role, "house_structure_delete")) {
      throw new Error("You don't have sufficient permissions to delete house structures.");
    }
    return new Promise(function(resolve, reject) {
      House.getOne(values.houseId)
        .then(house => {
          if(house._owner_id == user.id && !checkPermission(user.role, "house_structure_delete_owner_self")) {
            throw new Error("You don't have sufficient permissions to delete structures from houses you own.");
          }
          if(house._owner_id != user.id && !checkPermission(user.role, "house_structure_delete_owner_other")) {
            throw new Error("You don't have sufficient permissions to delete structures from houses you don't own.");
          }
          HouseStructure.delete(values.id)
            .then(success => resolve(success))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.HouseStructureDeleteSchema = HouseStructureDeleteSchema;
exports.HouseStructureDeleteMutation = HouseStructureDeleteMutation;