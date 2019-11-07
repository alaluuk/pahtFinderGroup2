const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const { House } = require("../../models");
const { HouseType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseCreateSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  countryCode: Joi.string().alphanum().length(2).required(),
  constructionYear: Joi.number().min(0).max((new Date()).getFullYear()).required(),
  ownerId: Joi.string().guid()
});

const HouseCreateMutation = {
  type: HouseType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    countryCode: { type: new GraphQLNonNull(GraphQLString) },
    constructionYear: { type: new GraphQLNonNull(GraphQLInt) },
    ownerId: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve(parentValue, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    if(!checkPermission(user.role, "house_create")) {
      throw new Error("You don't have sufficient permissions to create houses.");
    }
    let values = Joi.attempt(args, HouseCreateSchema);
    if(user.id != values.ownerId && !checkPermission(user.role, "house_create_owner_others")) {
      throw new Error("You don't have sufficient permissions to create houses owned by others.");
    }
    return House.create(values.name, values.countryCode, values.constructionYear, values.ownerId);
  }
};

exports.HouseCreateSchema = HouseCreateSchema;
exports.HouseCreateMutation = HouseCreateMutation;