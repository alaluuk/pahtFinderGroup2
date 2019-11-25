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
    createStructureType: mutations.StructureTypeCreateMutation,
    updateStructureType: mutations.StructureTypeUpdateMutation,
    deleteStructureType: mutations.StructureTypeDeleteMutation,
    createStructureTemplate: mutations.StructureTemplateCreateMutation,
    updateStructureTemplate: mutations.StructureTemplateUpdateMutation,
    deleteStructureTemplate: mutations.StructureTemplateDeleteMutation,
    createStructure: mutations.StructureCreateMutation,
    updateStructure: mutations.StructureUpdateMutation,
    deleteStructure: mutations.StructureDeleteMutation,
    createHouse: mutations.HouseCreateMutation,
    updateHouse: mutations.HouseUpdateMutation,
    deleteHouse: mutations.HouseDeleteMutation,
    createHouseStructure: mutations.HouseStructureCreateMutation,
    updateHouseStructure: mutations.HouseStructureUpdateMutation,
    deleteHouseStructure: mutations.HouseStructureDeleteMutation,
  }
});

exports.RootMutation = RootMutation;