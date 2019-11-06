const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { User } = require("../../models/user");
const { checkPermission } = require("../../permissions");

const UserDeleteSchema = Joi.object({
  id: Joi.number().positive().required(),
});

const UserDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, UserDeleteSchema);
    if(values.id == user.id && !checkPermission(user.role, "user_delete_self")) {
      throw new Error("You don't have sufficient permissions to delete your account.");
    }
    if(values.id != user.id && !checkPermission(user.role, "user_delete_others")) {
      throw new Error("You don't have sufficient permissions to delete other users.");
    }
    let deleting_user = User.getOne(values.id);
    if(!checkPermission(user.role, "user_delete_role_"+deleting_user.role)) {
      throw new Error("You don't have sufficient permissions to delete users of the role '"+deleting_user.role+"'.");
    }
    return deleting_user.delete();
  }
};

exports.UserDeleteSchema = UserDeleteSchema;
exports.UserDeleteMutation = UserDeleteMutation;