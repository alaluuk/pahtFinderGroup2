const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat } = require("graphql");
const { StructureTemplate } = require("../../models");
const { StructureTemplateType } = require("../types");
const { checkPermission } = require("../../permissions");

// TODO

const StructureTemplateUpdateSchema = Joi.object({
  id: Joi.string().guid(),
  // name: Joi.string().min(3).max(255),
  // uValue: Joi.number()
});

const StructureTemplateUpdateMutation = {
  type: StructureTemplateType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    uValue: { type: GraphQLFloat }
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTemplateUpdateSchema);
    if(!checkPermission(auth.user.role, "structure_template_update")) {
      throw new Error("You don't have sufficient permissions to edit structure templates.");
    }
    return new Promise(function(resolve, reject) {
      StructureTemplate.getOne(values.id)
        .then(structure_template => {
          // if(values.name) structure_template.name = values.name;
          // if(values.uValue) structure_template.uValue = values.uValue;
          structure_template.save()
            .then(success => resolve(structure_template))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.StructureTemplateUpdateSchema = StructureTemplateUpdateSchema;
exports.StructureTemplateUpdateMutation = StructureTemplateUpdateMutation;