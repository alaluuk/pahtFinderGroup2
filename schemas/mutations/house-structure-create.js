const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLID } = require("graphql");
const { HouseStructure, House, StructureType } = require("../../models");
const { HouseStructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseStructureCreateSchema = Joi.object({
  houseId: Joi.string().guid().required(),
  title: Joi.string().min(3).max(255).required(),
  typeId: Joi.string().guid().required(),
  uValue: Joi.number().required(),
  price: Joi.number().positive().precision(2),
  manufacturer: Joi.string().max(255),
  serialNumber: Joi.string().max(255),
  productionYear: Joi.number()
});

const HouseStructureCreateMutation = {
  type: HouseStructureType,
  args: {
    houseId: { type: new GraphQLNonNull(GraphQLID) },
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
    let values = Joi.attempt(args, HouseStructureCreateSchema);
    try {
      var house = await House.getOne(values.id);
    } catch (error) {
      throw new Error("There is no house with this ID.");
    }
    if(house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_structure_create_owner_self")) {
      reject(new Error("You don't have sufficient permissions to create structures for houses you own."));
    }
    if(house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_structure_create_owner_other")) {
      reject(new Error("You don't have sufficient permissions to create structures for houses you don't own."));
    }
    try {
      var structure_type = await StructureType.getOne(values.typeId);
    } catch(err) {
      throw new Error("There is no structure type with this ID.");
    }
    let house_structure = await HouseStructure.create(
      values.houseId,
      values.title,
      values.typeId,
      values.uValue,
      values.price,
      values.manufacturer,
      values.serialNumber,
      values.productionYear
    );
    return house_structure;
  }
};

exports.HouseStructureCreateSchema = HouseStructureCreateSchema;
exports.HouseStructureCreateMutation = HouseStructureCreateMutation;