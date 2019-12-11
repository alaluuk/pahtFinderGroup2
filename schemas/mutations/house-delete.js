const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { House } = require("../../models");
const { checkPermission } = require("../../permissions");

const HouseDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const HouseDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseDeleteSchema);
    try {
      var house = await House.getOne(values.id);
    } catch (error) {
      throw new Error("There is no house with this ID.");
    }
    if(house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_delete_owner_self")) {
      throw new Error("You don't have sufficient permissions to delete houses owned by yourself.");
    }
    if(house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_delete_owner_others")) {
      throw new Error("You don't have sufficient permissions to delete houses owned by others.");
    }
    let status = await house.delete();
    return status;
  }
};

exports.HouseDeleteMutation = HouseDeleteMutation;