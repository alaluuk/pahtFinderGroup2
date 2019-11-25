const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { Structure } = require("../../models");
const { checkPermission } = require("../../permissions");

const StructureDeleteSchema = Joi.object({
  id: Joi.string().guid().required()
});

const StructureDeleteMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureDeleteSchema);
    if(!checkPermission(auth.user.role, "structure_delete")) {
      throw new Error("You don't have sufficient permissions to delete structures.");
    }
    return Structure.delete(values.id);
  }
};

exports.StructureDeleteSchema = StructureDeleteSchema;
exports.StructureDeleteMutation = StructureDeleteMutation;