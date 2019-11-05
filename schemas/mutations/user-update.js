const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const { User } = require("../../models/user");
const { UserType } = require("../types");

exports.UserUpdateMutation = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString }
  },
  resolve(parentValue, args) {
    // TODO: Check permissions, sanitize & check all inputs
    return new Promise(function(resolve, reject) {
      User.getOne(args.id)
        .then(user => {
          if(args.name) user.name = args.name;
          if(args.email) user.email = args.email;
          if(args.password) user.password = args.password;
          if(args.role) user.role = args.role;
          user.save();
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }
}