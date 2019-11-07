const { GraphQLObjectType } = require("graphql");
const mutations = require("./mutations");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    signup: mutations.CustomerSignupMutation,
    login: mutations.CustomerLoginMutation,
    createUser: mutations.UserCreateMutation,
    updateUser: mutations.UserUpdateMutation,
    deleteUser: mutations.UserDeleteMutation,
    createHouse: mutations.HouseCreateMutation,
    updateHouse: mutations.HouseUpdateMutation,
    deleteHouse: mutations.HouseDeleteMutation,
    createStructureType: mutations.StructureTypeCreateMutation,
    updateStructureType: mutations.StructureTypeUpdateMutation,
    deleteStructureType: mutations.StructureTypeDeleteMutation,
  }
});

exports.RootMutation = RootMutation;