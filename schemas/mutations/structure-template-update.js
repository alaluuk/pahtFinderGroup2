const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } = require("graphql");
const { StructureTemplate, StructureType } = require("../../models");
const { StructureTemplateType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureTemplateUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  title: Joi.string().min(3).max(255).allow(null),
  typeId: Joi.string().guid().allow(null),
  uValue: Joi.number().allow(null),
  price: Joi.number().positive().precision(2).allow(null),
  manufacturer: Joi.string().max(255).allow(null),
  serialNumber: Joi.string().max(255).allow(null),
  productionYear: Joi.number().allow(null)
});

const StructureTemplateUpdateMutation = {
  type: StructureTemplateType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    typeId: { type: GraphQLID },
    uValue: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    manufacturer: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    productionYear: { type: GraphQLInt }
  },
  resolve: async(_, args, { auth }) => {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, StructureTemplateUpdateSchema);
    if(!checkPermission(auth.user.role, "structure_template_update")) {
      throw new Error("You don't have sufficient permissions to edit structure templates.");
    }
    try {
      var structure_template = await StructureTemplate.getOne(values.id);
    } catch (error) {
      throw new Error("There is no structure template with this ID.");
    }
    if(values.typeId) {
      try {
        var structure_type = await StructureType.getOne(values.typeId);
      } catch(err) {
        throw new Error("There is no structure type with this ID.");
      }
    }
    if(values.title) structure_template.title = values.title;
    if(values.typeId) structure_template._type_id = values.typeId;
    if(values.uValue) structure_template.uValue = values.uValue;
    if(values.price) structure_template.price = values.price;
    if(values.manufacturer) structure_template.manufacturer = values.manufacturer;
    if(values.serialNumber) structure_template.serialNumber = values.serialNumber;
    if(values.productionYear) structure_template.productionYear = values.productionYear;
    let status = await structure_template.save();
    return structure_template;
  }
};

exports.StructureTemplateUpdateSchema = StructureTemplateUpdateSchema;
exports.StructureTemplateUpdateMutation = StructureTemplateUpdateMutation;