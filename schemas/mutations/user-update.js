const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const { User } = require("../../models");
const { UserType } = require("../types");
const { checkPermission } = require("../../permissions");

const UserUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  name: Joi.string().min(3).max(255),
  email: Joi.string().email().max(255),
  password: Joi.string().min(6).max(255),
  role: Joi.string()
});

const UserUpdateMutation = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, UserUpdateSchema);
    if(values.id == user.id && !checkPermission(user.role, "user_update_self")) {
      throw new Error("You don't have sufficient permissions to edit your account.");
    }
    if(values.id != user.id && !checkPermission(user.role, "user_update_other")) {
      throw new Error("You don't have sufficient permissions to edit other users.");
    }
    if(!checkPermission(user.role, "user_update_role_"+values.role)) {
      throw new Error("You don't have sufficient permissions to change roles to '"+values.role+"'.");
    }
    return new Promise(function(resolve, reject) {
      User.getOne(values.id)
        .then(user => {
          if(values.name) user.name = values.name;
          if(values.email) user.email = values.email;
          if(values.password) user.password = values.password;
          if(values.role) user.role = values.role;
          user.save()
            .then(success => resolve(user))
            .catch(err => {
              if(err.code == '23505') reject(new Error("This email address is already being used."));
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }
};

exports.UserUpdateSchema = UserUpdateSchema;
exports.UserUpdateMutation = UserUpdateMutation;