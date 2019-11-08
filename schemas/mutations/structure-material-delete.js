const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { StructureMaterial } = require("../../models");
const { checkPermission } = require("../../permissions");

const StructureMaterialDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const StructureMaterialDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureMaterialDeleteSchema);
    if(!checkPermission(user.role, "structure_material_delete")) {
      throw new Error("You don't have sufficient permissions to delete structure materials.");
    }
    return StructureMaterial.delete(values.id);
  }
};

exports.StructureMaterialDeleteSchema = StructureMaterialDeleteSchema;
exports.StructureMaterialDeleteMutation = StructureMaterialDeleteMutation;