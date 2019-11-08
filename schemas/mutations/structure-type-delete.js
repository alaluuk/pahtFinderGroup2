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
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTypeDeleteSchema);
    if(!checkPermission(user.role, "structure_type_delete")) {
      throw new Error("You don't have sufficient permissions to delete structure types.");
    }
    return StructureType.delete(values.id);
  }
};

exports.StructureTypeDeleteSchema = StructureTypeDeleteSchema;
exports.StructureTypeDeleteMutation = StructureTypeDeleteMutation;