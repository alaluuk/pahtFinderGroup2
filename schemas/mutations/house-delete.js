const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { House } = require("../../models/house");
const { checkPermission } = require("../../permissions");

const HouseDeleteSchema = Joi.object({
  id: Joi.number().positive().required(),
});

const HouseDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseDeleteSchema);
    let house = House.getOne(values.id);
    if(house._owner_id == user.id && !checkPermission(user.role, "house_delete_owner_self")) {
      throw new Error("You don't have sufficient permissions to delete houses owned by yourself.");
    }
    if(house._owner_id != user.id && !checkPermission(user.role, "house_delete_owner_others")) {
      throw new Error("You don't have sufficient permissions to delete houses owned by others.");
    }
    return house.delete();
  }
};

exports.HouseDeleteMutation = HouseDeleteMutation;