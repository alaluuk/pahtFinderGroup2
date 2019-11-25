const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { StructureTemplate } = require("../../models");
const { checkPermission } = require("../../permissions");

const StructureTemplateDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const StructureTemplateDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTemplateDeleteSchema);
    if(!checkPermission(auth.user.role, "structure_template_delete")) {
      throw new Error("You don't have sufficient permissions to delete structure templates.");
    }
    return StructureTemplate.delete(values.id);
  }
};

exports.StructureTemplateDeleteSchema = StructureTemplateDeleteSchema;
exports.StructureTemplateDeleteMutation = StructureTemplateDeleteMutation;