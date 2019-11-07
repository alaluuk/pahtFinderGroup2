const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat } = require("graphql");
const { Structure } = require("../../models");
const { StructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  title: Joi.string().min(3).max(255),
  typeId: Joi.string().guid(),
  uValue: Joi.number(),
  materialId: Joi.string().guid()
});

const StructureUpdateMutation = {
  type: StructureType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    typeId: { type: GraphQLID },
    uValue: { type: GraphQLFloat },
    materialId: { type: GraphQLID }
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureUpdateSchema);
    if(!checkPermission(user.role, "structure_update")) {
      throw new Error("You don't have sufficient permissions to edit structures.");
    }
    // TODO: Narrow down permissions to ownership
    return new Promise(function(resolve, reject) {
      Structure.getOne(values.id)
        .then(structure => {
          if(values.title) structure.title = values.title;
          if(values.typeId) structure._type_id = values.typeId; // TODO: check if type id is a valid structure type
          if(values.uValue) structure.uValue = values.uValue;
          if(values.materialId) structure._material_id = values.materialId; // TODO: check if material id is a valid structure material
          structure.save()
            .then(success => resolve(structure))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.StructureUpdateSchema = StructureUpdateSchema;
exports.StructureUpdateMutation = StructureUpdateMutation;