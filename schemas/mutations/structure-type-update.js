const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const { StructureType } = require("../../models");
const { StructureTypeType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureTypeUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  title: Joi.string().min(3).max(255)
});

const StructureTypeUpdateMutation = {
  type: StructureTypeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTypeUpdateSchema);
    if(!checkPermission(user.role, "structure_type_update")) {
      throw new Error("You don't have sufficient permissions to edit structure types.");
    }
    return new Promise(function(resolve, reject) {
      StructureType.getOne(values.id)
        .then(structure_type => {
          if(values.title) structure_type.title = values.title;
          structure_type.save()
            .then(success => resolve(structure_type))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.StructureTypeUpdateSchema = StructureTypeUpdateSchema;
exports.StructureTypeUpdateMutation = StructureTypeUpdateMutation;