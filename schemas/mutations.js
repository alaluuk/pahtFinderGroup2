const { GraphQLObjectType } = require("graphql");
const { CustomerSignupMutation } = require("./mutations/customer-signup");
const { CustomerLoginMutation } = require("./mutations/customer-login");
const { UserCreateMutation } = require("./mutations/user-create");
const { UserUpdateMutation } = require("./mutations/user-update");
const { UserDeleteMutation } = require("./mutations/user-delete");
const { HouseCreateMutation } = require("./mutations/house-create");
const { HouseUpdateMutation } = require("./mutations/house-update");
const { HouseDeleteMutation } = require("./mutations/house-delete");
const { StructureTypeCreateMutation } = require("./mutations/structure-type-create");
const { StructureTypeUpdateMutation } = require("./mutations/structure-type-update");
const { StructureTypeDeleteMutation } = require("./mutations/structure-type-delete");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    signup: CustomerSignupMutation,
    login: CustomerLoginMutation,
    createUser: UserCreateMutation,
    updateUser: UserUpdateMutation,
    deleteUser: UserDeleteMutation,
    createHouse: HouseCreateMutation,
    updateHouse: HouseUpdateMutation,
    deleteHouse: HouseDeleteMutation,
    createStructureType: StructureTypeCreateMutation,
    updateStructureType: StructureTypeUpdateMutation,
    deleteStructureType: StructureTypeDeleteMutation,
  }
});

exports.mutation = RootMutation;