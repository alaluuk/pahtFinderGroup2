const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLID } = require("graphql");
const { StructureTemplate, StructureType } = require("../../models");
const { StructureTemplateType } = require("../types");
const { checkPermission } = require("../../permissions");

const StructureTemplateCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  typeId: Joi.string().guid().required(),
  uValue: Joi.number().required(),
  price: Joi.number().positive().precision(2),
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
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(auth.user.role, "structure_template_create")) {
      throw new Error("You don't have sufficient permissions to create structure templates.");
    }
    let values = Joi.attempt(args, StructureTemplateCreateSchema);
    return new Promise(function(resolve, reject) {
      StructureType.getOne(values.typeId)
        .then(structure_type => {
          StructureTemplate.create(
            values.title,
            values.typeId,
            values.uValue,
            values.price,
            values.manufacturer,
            values.serialNumber,
            values.productionYear
          )
            .then(house_structure => resolve(house_structure))
            .catch(err => reject(err));
        })
        .catch(err => reject(new Error("Invalid structure type: There is no structure type with this ID.")));
    });
  }
};

exports.StructureTemplateCreateSchema = StructureTemplateCreateSchema;
exports.StructureTemplateCreateMutation = StructureTemplateCreateMutation;