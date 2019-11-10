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
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, UserDeleteSchema);
    if(values.id == user.id && !checkPermission(user.role, "user_delete_self")) {
      throw new Error("You don't have sufficient permissions to delete your account.");
    }
    if(values.id != user.id && !checkPermission(user.role, "user_delete_others")) {
      throw new Error("You don't have sufficient permissions to delete other users.");
    }
    return new Promise(function(resolve, reject) {
      User.getOne(values.id)
        .then(deleting_user => {
          if(!checkPermission(user.role, "user_delete_role_"+deleting_user.role)) {
            throw new Error("You don't have sufficient permissions to delete users of the role '"+deleting_user.role+"'.");
          }
          deleting_user.delete()
            .then(success => resolve(success))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.UserDeleteSchema = UserDeleteSchema;
exports.UserDeleteMutation = UserDeleteMutation;