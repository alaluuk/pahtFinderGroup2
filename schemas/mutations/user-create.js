const { GraphQLNonNull, GraphQLString } = require("graphql");
const { User } = require("../../models/user");
const { UserType } = require("../types");

exports.UserCreateMutation = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, args) {
    // TODO: Check permissions, sanitize & check all inputs
    return User.create(args.name, args.email, args.password, args.role);
  }
}