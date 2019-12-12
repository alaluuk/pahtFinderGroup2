const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } = require("graphql");
const { HouseStructure, House, StructureType } = require("../../models");
const { HouseStructureType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseStructureUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  houseId: Joi.string().guid(),
  title: Joi.string().min(3).max(255).allow(null),
  typeId: Joi.string().guid().allow(null),
  uValue: Joi.number().allow(null),
  price: Joi.number().positive().precision(2).allow(null),
  manufacturer: Joi.string().max(255).allow(null),
  serialNumber: Joi.string().max(255).allow(null),
  productionYear: Joi.number().allow(null)
});

const HouseStructureUpdateMutation = {
  type: HouseStructureType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    houseId: { type: GraphQLID },
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
    let values = Joi.attempt(args, HouseStructureUpdateSchema);
    try {
      var house_structure = await HouseStructure.getOne(values.id);
    } catch (error) {
      throw new Error("Invalid structure template: There is no structure template with this ID.");
    }
    try {
      var house = await House.getOne(house_structure._house_id);
    } catch (error) {
      throw new Error("There is no house with this ID.");
    }
    if(values.houseId && values.houseId !== house_structure._house_id) {
      try {
        var new_house = await House.getOne(values.houseId);
      } catch(err) {
        throw new Error("There is no house with this ID.");
      }
      if(new_house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_structure_update_house_owner_self")) {
        throw new Error("You don't have sufficient permissions to transfer structures to houses you own.");
      }
      if(new_house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_structure_update_house_owner_other")) {
        throw new Error("You don't have sufficient permissions to transfer structures to houses you don't own.");
      }
      house_structure._house_id = new_house.id;
    }
    if(values.typeId && values.typeId !== house_structure._type_id) {
      try {
        var structure_type = await StructureType.getOne(values.typeId);
      } catch(err) {
        throw new Error("There is no structure type with this ID.");
      }
      house_structure._type_id = values.typeId;
    }
    if(values.title) house_structure.title = values.title;
    if(values.uValue) house_structure.uValue = values.uValue;
    if(values.price) house_structure.price = values.price;
    if(values.manufacturer) house_structure.manufacturer = values.manufacturer;
    if(values.serialNumber) house_structure.serialNumber = values.serialNumber;
    if(values.productionYear) house_structure.productionYear = values.productionYear;
    let status = await house_structure.save();
    return house_structure;
  }
};

exports.HouseStructureUpdateSchema = HouseStructureUpdateSchema;
exports.HouseStructureUpdateMutation = HouseStructureUpdateMutation;