const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { StructureType } = require("../../models");
const { checkPermission } = require("../../permissions");

const StructureTypeDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const StructureTypeDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTypeDeleteSchema);
    if(!checkPermission(auth.user.role, "structure_type_delete")) {
      throw new Error("You don't have sufficient permissions to delete structure types.");
    }
    try {
      var structure_type = await StructureType.getOne(values.id);
    } catch (error) {
      throw new Error("There is no structure type with this ID.");
    }
    let status = await structure_type.delete();
    return status;
  }
};

exports.StructureTypeDeleteSchema = StructureTypeDeleteSchema;
exports.StructureTypeDeleteMutation = StructureTypeDeleteMutation;