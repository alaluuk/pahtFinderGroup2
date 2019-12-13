const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLID } = require("graphql");
const { StructureTemplate, StructureType } = require("../../models");
const { StructureTemplateType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureTemplateCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  typeId: Joi.string().guid().required(),
  uValue: Joi.number().required(),
  price: Joi.number().min(0).precision(2),
  manufacturer: Joi.string().max(255),
  serialNumber: Joi.string().max(255),
  productionYear: Joi.number()
});

const StructureTemplateCreateMutation = {
  type: StructureTemplateType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    typeId: { type: new GraphQLNonNull(GraphQLID) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) },
    price: { type: GraphQLFloat },
    manufacturer: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    productionYear: { type: GraphQLInt }
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(auth.user.role, "structure_template_create")) {
      throw new Error("You don't have sufficient permissions to create structure templates.");
    }
    let values = Joi.attempt(args, StructureTemplateCreateSchema);
    try {
      var structure_type = await StructureType.getOne(values.typeId);
    } catch (error) {
      throw new Error("There is no structure type with this ID.");
    }
    let structure_template = StructureTemplate.create(
      values.title,
      values.typeId,
      values.uValue,
      values.price,
      values.manufacturer,
      values.serialNumber,
      values.productionYear
    );
    return structure_template;
  }
};

exports.StructureTemplateCreateSchema = StructureTemplateCreateSchema;
exports.StructureTemplateCreateMutation = StructureTemplateCreateMutation;