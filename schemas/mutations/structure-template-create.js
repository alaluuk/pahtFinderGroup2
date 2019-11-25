const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql");
const { StructureTemplate } = require("../../models");
const { StructureTemplateType } = require("../types");
const { checkPermission } = require("../../permissions");

// TODO

const StructureTemplateCreateSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  uValue: Joi.number().required()
});

const StructureTemplateCreateMutation = {
  type: StructureTemplateType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) }
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(auth.user.role, "structure_template_create")) {
      throw new Error("You don't have sufficient permissions to create structure templates.");
    }
    let values = Joi.attempt(args, StructureTemplateCreateSchema);
    // if(values.materialId) {
    //   try {
    //     let structure_material = await StructureMaterial.getOne(values.typeId);
    //     structure._material_id = structure_material.id;
    //   } catch(err) {
    //     reject(new Error("The specified structure material ID is invalid because there is no structure material with this ID."));
    //   }
    // }
    return StructureTemplate.create(values.title, values.type_id);
  }
};

exports.StructureTemplateCreateSchema = StructureTemplateCreateSchema;
exports.StructureTemplateCreateMutation = StructureTemplateCreateMutation;