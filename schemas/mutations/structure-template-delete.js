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
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTemplateDeleteSchema);
    if(!checkPermission(auth.user.role, "structure_template_delete")) {
      throw new Error("You don't have sufficient permissions to delete structure templates.");
    }
    try {
      var structure_template = await StructureTemplate.getOne(values.id);
    } catch (error) {
      throw new Error("There is no structure template with this ID.");
    }
    let status = await structure_template.delete();
    return status;
  }
};

exports.StructureTemplateDeleteSchema = StructureTemplateDeleteSchema;
exports.StructureTemplateDeleteMutation = StructureTemplateDeleteMutation;