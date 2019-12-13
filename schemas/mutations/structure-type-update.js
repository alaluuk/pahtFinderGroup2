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
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTypeUpdateSchema);
    if(!checkPermission(auth.user.role, "structure_type_update")) {
      throw new Error("You don't have sufficient permissions to edit structure types.");
    }
    try {
      var structure_type = await StructureType.getOne(values.id);
    } catch (error) {
      throw new Error("There is no structure type with this ID.");
    }
    if(values.title) structure_type.title = values.title;
    let status = await structure_type.save();
    return status;
  }
};

exports.StructureTypeUpdateSchema = StructureTypeUpdateSchema;
exports.StructureTypeUpdateMutation = StructureTypeUpdateMutation;