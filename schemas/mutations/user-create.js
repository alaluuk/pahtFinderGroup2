const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { User } = require("../../models");
const { UserType } = require("../types");
const { checkPermission } = require("../../permissions");

const UserCreateSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
  role: Joi.string().required(),
});

const UserCreateMutation = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, UserCreateSchema);
    if(!checkPermission(auth.user.role, "user_create")) {
      throw new Error("You don't have sufficient permissions to create users.");
    }
    if(!checkPermission(auth.user.role, "user_create_role_"+values.role)) {
      throw new Error("You don't have sufficient permissions to create users with the role '"+values.role+"'.");
    }
    // TODO: Check if is valid role
    try {
      var user = await User.create(values.name, values.email, values.password, values.role);
    } catch(err) {
      if(err.code == '23505') throw new Error("This email address is already being used by another user.");
      throw err;
    }
    return user;
  }
};

exports.UserCreateSchema = UserCreateSchema;
exports.UserCreateMutation = UserCreateMutation;