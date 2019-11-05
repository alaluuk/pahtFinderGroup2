const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { User } = require("../../models/user");

exports.UserDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parentValue, args) {
    // TODO: Check permissions, sanitize & check all inputs
    return User.delete(args.id);
  }
}