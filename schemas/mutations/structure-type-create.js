const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { StructureType } = require("../../models/structure-type");
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
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(user.role, "structure_type_create")) {
      throw new Error("You don't have sufficient permissions to create structure types.");
    }
    let values = Joi.attempt(args, StructureTypeCreateSchema);
    return StructureType.create(values.title);
  }
};

exports.StructureTypeCreateSchema = StructureTypeCreateSchema;
exports.StructureTypeCreateMutation = StructureTypeCreateMutation;