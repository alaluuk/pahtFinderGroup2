const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID } = require("graphql");
const { Structure } = require("../../models");
const { StructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  typeId: Joi.string().guid().required(),
  uValue: Joi.number().required(),
  materialId: Joi.string().guid()
});

const StructureCreateMutation = {
  type: StructureType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    typeId: { type: new GraphQLNonNull(GraphQLID) },
    uValue: { type: GraphQLFloat },
    materialId: { type: GraphQLID }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(user.role, "structure_create")) {
      throw new Error("You don't have sufficient permissions to create structures.");
    }
    let values = Joi.attempt(args, StructureCreateSchema);
    return Structure.create(values.title, values.typeId, values.uValue, values.materialId);
  }
};

exports.StructureCreateSchema = StructureCreateSchema;
exports.StructureCreateMutation = StructureCreateMutation;