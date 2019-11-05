const { GraphQLObjectType } = require("graphql");
const { UserCreateMutation } = require("./mutations/user-create");
const { UserUpdateMutation } = require("./mutations/user-update");
const { UserDeleteMutation } = require("./mutations/user-delete");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    createUser: UserCreateMutation,
    updateUser: UserUpdateMutation,
    deleteUser: UserDeleteMutation
  }
});

exports.mutation = RootMutation;