const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { StructureType } = require("../../models");
const { StructureTypeType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureTypeCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required()
});

const StructureTypeCreateMutation = {
  type: StructureTypeType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(auth.user.role, "structure_type_create")) {
      throw new Error("You don't have sufficient permissions to create structure types.");
    }
    let values = Joi.attempt(args, StructureTypeCreateSchema);
    let structure_type = await StructureType.create(values.title);
    return structure_type;
  }
};

exports.StructureTypeCreateSchema = StructureTypeCreateSchema;
exports.StructureTypeCreateMutation = StructureTypeCreateMutation;