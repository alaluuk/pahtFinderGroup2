const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat } = require("graphql");
const { StructureMaterial } = require("../../models");
const { StructureMaterialType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureMaterialUpdateSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string().min(3).max(255),
  uValue: Joi.number()
});

const StructureMaterialUpdateMutation = {
  type: StructureMaterialType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    uValue: { type: GraphQLFloat }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureMaterialUpdateSchema);
    if(!checkPermission(user.role, "structure_material_update")) {
      throw new Error("You don't have sufficient permissions to edit structure materials.");
    }
    return new Promise(function(resolve, reject) {
      StructureMaterial.getOne(values.id)
        .then(structure_material => {
          if(values.name) structure_material.name = values.name;
          if(values.uValue) structure_material.uValue = values.uValue;
          structure_material.save()
            .then(success => resolve(structure_material))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.StructureMaterialUpdateSchema = StructureMaterialUpdateSchema;
exports.StructureMaterialUpdateMutation = StructureMaterialUpdateMutation;