const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require("graphql");
const { House } = require("../../models");
const { HouseType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  name: Joi.string().min(3).max(255),
  ownerId: Joi.string().guid(),
  countryCode: Joi.string().alphanum().length(2),
  constructionYear: Joi.number().min(0).max((new Date()).getFullYear()),
  heatingSystem: Joi.string().min(1),
  costOfHeating: Joi.number(),
  warmWaterPipe: Joi.boolean()
});

const HouseUpdateMutation = {
  type: HouseType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    ownerId: { type: GraphQLID },
    countryCode: { type: GraphQLString },
    constructionYear: { type: GraphQLInt },
    heatingSystem: { type: GraphQLString },
    costOfHeating: { type: GraphQLFloat },
    warmWaterPipe: { type: GraphQLBoolean }
  },
  resolve(_, args, { user }) {
    if(!user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseUpdateSchema);
    return new Promise(function(resolve, reject) {
      House.getOne(values.id)
        .then(house => {
          if(house._owner_id == user.id && !checkPermission(user.role, "house_update_owner_self")) {
            throw new Error("You don't have sufficient permissions to edit houses you own.");
          }
          if(house._owner_id != user.id && !checkPermission(user.role, "house_update_owner_other")) {
            throw new Error("You don't have sufficient permissions to edit houses you don't own.");
          }
          if(house._owner_id != values.ownerId && !checkPermission(user.role, "house_update_owner")) {
            throw new Error("You don't have sufficient permissions to transfer the ownership of houses.");
          }
          if(values.name) house.name = values.name;
          if(values.ownerId) house._owner_id = values.ownerId; // TODO: check if owner id is a valid user
          if(values.countryCode) house.countryCode = values.countryCode;
          if(values.constructionYear) house.constructionYear = values.constructionYear;
          if(values.heatingSystem) house.heatingSystem = values.heatingSystem;
          if(values.costOfHeating) house.costOfHeating = values.costOfHeating;
          if(values.warmWaterPipe) house.warmWaterPipe = values.warmWaterPipe;
          house.save()
            .then(success => resolve(house))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};

exports.HouseUpdateSchema = HouseUpdateSchema;
exports.HouseUpdateMutation = HouseUpdateMutation;