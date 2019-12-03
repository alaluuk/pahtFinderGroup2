const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } = require("graphql");
const { HouseStructure, House } = require("../../models");
const { HouseStructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseStructureUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  houseId: Joi.string().guid(),
  title: Joi.string().min(3).max(255),
  typeId: Joi.string().guid(),
  uValue: Joi.number(),
  price: Joi.number().positive().precision(2),
  manufacturer: Joi.string().max(255),
  serial_number: Joi.string().max(255),
  production_year: Joi.number()
});

const HouseStructureUpdateMutation = {
  type: HouseStructureType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    houseId: { type: GraphQLID },
    title: { type: GraphQLString },
    typeId: { type: GraphQLInt },
    uValue: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    manufacturer: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    productionYear: { type: GraphQLInt }
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseStructureUpdateSchema);
    if(!checkPermission(auth.user.role, "house_structure_update")) {
      throw new Error("You don't have sufficient permissions to edit house structures.");
    }
    return new Promise(async function(resolve, reject) {
      try {
        let house_structure = await HouseStructure.getOne(values.id);
      } catch (error) {
        throw new Error("Invalid structure template: There is no structure template with this ID.");
      }
      if(values.houseId) {
        try {
          let house = await House.getOne(values.houseId);
        } catch(err) {
          throw new Error("Invalid house: There is no house with this ID.");
        }
      }
      if(house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_structure_update_owner_self")) {
        throw new Error("You don't have sufficient permissions to update structures of houses you own.");
      }
      if(house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_structure_update_owner_other")) {
        throw new Error("You don't have sufficient permissions to update structures of houses you don't own.");
      }
      if(values.typeId) {
        try {
          let structure_type = await StructureType.getOne(values.typeId);
        } catch(err) {
          throw new Error("Invalid structure type: There is no structure type with this ID.");
        }
      }
      if(values.title) house_structure.title = values.title;
      if(values.typeId) house_structure._type_id = values.typeId;
      if(values.uValue) house_structure.uValue = values.uValue;
      if(values.price) house_structure.price = values.price;
      if(values.manufacturer) house_structure.manufacturer = values.manufacturer;
      if(values.serialNumber) house_structure.serialNumber = values.serialNumber;
      if(values.productionYear) house_structure.productionYear = values.productionYear;
      house_structure.save()
        .then(success => resolve(house_structure))
        .catch(err => reject(err));
    });
  }
};

exports.HouseStructureUpdateSchema = HouseStructureUpdateSchema;
exports.HouseStructureUpdateMutation = HouseStructureUpdateMutation;