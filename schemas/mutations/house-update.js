const Joi = require('@hapi/joi');
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require("graphql");
const { House, User } = require("../../models");
const { HouseType } = require("../types");
const { checkPermission } = require("../../permissions");

const HouseUpdateSchema = Joi.object({
  id: Joi.string().guid().required(),
  name: Joi.string().min(3).max(255),
  ownerId: Joi.string().guid(),
  addressCountry: Joi.string().alphanum().length(2),
  addressCity: Joi.string().max(255),
  addressStreet: Joi.string().max(255),
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
    addressCountry: { type: GraphQLString },
    addressCity: { type: GraphQLString },
    addressStreet: { type: GraphQLString },
    constructionYear: { type: GraphQLInt },
    heatingSystem: { type: GraphQLString },
    costOfHeating: { type: GraphQLFloat },
    warmWaterPipe: { type: GraphQLBoolean }
  },
  resolve(_, args, { auth }) {
    if(!auth.user) throw new Error("You must be logged in to perform this action.");
    let values = Joi.attempt(args, HouseUpdateSchema);
    return new Promise(function(resolve, reject) {
      House.getOne(values.id)
        .then(async function(house) {
          if(house._owner_id == auth.user.id && !checkPermission(auth.user.role, "house_update_owner_self")) {
            throw new Error("You don't have sufficient permissions to edit houses you own.");
          }
          if(house._owner_id != auth.user.id && !checkPermission(auth.user.role, "house_update_owner_other")) {
            throw new Error("You don't have sufficient permissions to edit houses you don't own.");
          }
          if(house._owner_id != values.ownerId && !checkPermission(auth.user.role, "house_update_owner")) {
            throw new Error("You don't have sufficient permissions to transfer the ownership of houses.");
          }
          if(values.name) house.name = values.name;
          if(values.ownerId) {
            try {
              let owner = await User.getOne(values.ownerId);
              house._owner_id = owner.id;
            } catch(err) {
              reject(new Error("The specified owner ID is invalid because there is no user with this ID."));
            }
          }
          if(values.addressCountry) house.addressCountry = values.addressCountry;
          if(values.addressCity) house.addressCity = values.addressCity;
          if(values.addressStreet) house.addressStreet = values.addressStreet;
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