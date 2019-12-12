const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { User } = require("../../models");
const { checkPermission } = require("../../permissions");

const UserDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const UserDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, UserDeleteSchema);
    if(values.id == auth.user.id && !checkPermission(auth.user.role, "user_delete_self")) {
      throw new Error("You don't have sufficient permissions to delete your account.");
    }
    if(values.id != auth.user.id && !checkPermission(auth.user.role, "user_delete_others")) {
      throw new Error("You don't have sufficient permissions to delete other users.");
    }
    try {
      var user = await User.getOne(values.id);
    } catch (error) {
      throw new Error("There is no user with this ID.");
    }
    if(values.id != auth.user.id && !checkPermission(auth.user.role, "user_delete_role_"+user.role)) {
      throw new Error("You don't have sufficient permissions to delete users of the role '"+deleting_user.role+"'.");
    }
    let status = await user.delete();
    return status;
  }
};

exports.UserDeleteSchema = UserDeleteSchema;
exports.UserDeleteMutation = UserDeleteMutation;