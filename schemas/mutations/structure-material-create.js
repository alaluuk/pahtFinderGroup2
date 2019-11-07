const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql");
const { StructureMaterial } = require("../../models");
const { StructureMaterialType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureMaterialCreateSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  uValue: Joi.number().required()
});

const StructureMaterialCreateMutation = {
  type: StructureMaterialType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) }
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(user.role, "structure_material_create")) {
      throw new Error("You don't have sufficient permissions to create structure materials.");
    }
    let values = Joi.attempt(args, StructureMaterialCreateSchema);
    return StructureMaterial.create(values.name, values.uValue);
  }
};

exports.StructureMaterialCreateSchema = StructureMaterialCreateSchema;
exports.StructureMaterialCreateMutation = StructureMaterialCreateMutation;