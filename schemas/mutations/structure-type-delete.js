const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { StructureType } = require("../../models/structure-type");
const { checkPermission } = require("../../permissions");

const StructureTypeDeleteSchema = Joi.object({
  id: Joi.number().positive().required(),
});

const StructureTypeDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTypeDeleteSchema);
    if(!checkPermission(user.role, "structure_type_delete")) {
      throw new Error("You don't have sufficient permissions to delete structure types.");
    }
    let structure_type = StructureType.getOne(values.id);
    return structure_type.delete();
  }
};

exports.StructureTypeDeleteSchema = StructureTypeDeleteSchema;
exports.StructureTypeDeleteMutation = StructureTypeDeleteMutation;