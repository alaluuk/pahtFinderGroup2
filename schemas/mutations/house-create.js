const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require("graphql");
const { House } = require("../../models");
const { HouseType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseCreateSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  ownerId: Joi.string().guid(),
  countryCode: Joi.string().alphanum().length(2),
  constructionYear: Joi.number().min(0).max((new Date()).getFullYear()),
  heatingSystem: Joi.string().min(1),
  costOfHeating: Joi.number(),
  warmWaterPipe: Joi.boolean()
});

const HouseCreateMutation = {
  type: HouseType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    ownerId: { type: GraphQLInt },
    countryCode: { type: GraphQLString },
    constructionYear: { type: GraphQLInt },
    heatingSystem: { type: GraphQLString },
    costOfHeating: { type: GraphQLFloat },
    warmWaterPipe: { type: GraphQLBoolean }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(user.role, "house_create")) {
      throw new Error("You don't have sufficient permissions to create houses.");
    }
    let values = Joi.attempt(args, HouseCreateSchema);
    if(user.id != values.ownerId && !checkPermission(user.role, "house_create_owner_others")) {
      throw new Error("You don't have sufficient permissions to create houses owned by others.");
    }
    return House.create(
      values.name,
      values.countryCode,
      values.constructionYear,
      values.ownerId,
      values.heatingSystem,
      values.costOfHeating,
      values.warmWaterPipe
    );
  }
};

exports.HouseCreateSchema = HouseCreateSchema;
exports.HouseCreateMutation = HouseCreateMutation;