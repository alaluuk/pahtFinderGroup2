const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLID } = require("graphql");
const { HouseStructure, House, /* StructureType */ } = require("../../models");
const { HouseStructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseStructureCreateSchema = Joi.object({
  houseId: Joi.string().guid().required(),
  title: Joi.string().min(3).max(255).required(),
  typeId: Joi.string().guid().required(),
  uValue: Joi.number().required(),
  area: Joi.number().required(),
  manufacturer: Joi.string().max(255),
  serial_number: Joi.string().max(255),
  production_year: Joi.number()
});

const HouseStructureCreateMutation = {
  type: HouseStructureType,
  args: {
    houseId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    typeId: { type: new GraphQLNonNull(GraphQLID) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) },
    area: { type: new GraphQLNonNull(GraphQLFloat) },
    manufacturer: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    productionYear: { type: GraphQLInt }
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseStructureCreateSchema);
    return new Promise(async function(resolve, reject) {
      try {
        let house = await House.getOne(values.houseId);
      } catch(err) {
        throw new Error("Invalid house: There is no house with this ID.");
      }
      if(house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_structure_create_owner_self")) {
        throw new Error("You don't have sufficient permissions to create structures for houses you own.");
      }
      if(house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_structure_create_owner_other")) {
        throw new Error("You don't have sufficient permissions to create structures for houses you don't own.");
      }
      try {
        let structure_type = await StructureType.getOne(values.typeId);
      } catch(err) {
        throw new Error("Invalid structure type: There is no structure type with this ID.");
      }
      HouseStructure.create(
        values.houseId,
        values.title,
        values.typeId,
        values.typeId,
        values.uValue,
        values.area,
        values.manufacturer,
        values.serialNumber,
        values.productionYear
      )
        .then(house_structure => resolve(house_structure))
        .catch(err => reject(err));
    });
  }
};

exports.HouseStructureCreateSchema = HouseStructureCreateSchema;
exports.HouseStructureCreateMutation = HouseStructureCreateMutation;