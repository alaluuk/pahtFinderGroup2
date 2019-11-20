const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const { User } = require("../../models");
const { AuthPayloadType } = require("../types");

const CustomerLoginSchema = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().min(6).max(255).required(),
  longLived: Joi.boolean()
});

const CustomerLoginMutation = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    longLived: { type: GraphQLBoolean }
  },
  resolve(_, args, { auth }) {
    let values = Joi.attempt(args, CustomerLoginSchema);
    return new Promise(function(resolve, reject) {
      User.getOneByEmail(values.email)
      .then(user => {
        if(!auth.user.checkPassword(values.password)) {
          reject(new Error("Invalid email address and/or password. Please try again."));
        }
        resolve({
          token: JWT.sign(
            {
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
              }
            },
            process.env.JWT_SECRET,
            {
              subject: user.email,
              audience: process.env.JWT_AUDIENCE,
              issuer: process.env.JWT_ISSUER,
              expiresIn: (values.longLived) ? '1y' : '1d'
            }
          ),
          user: user
        });
      })
      .catch(err => reject(new Error("Invalid email address and/or password. Please try again.")));
    });
  }
};

exports.CustomerLoginSchema = CustomerLoginSchema;
exports.CustomerLoginMutation = CustomerLoginMutation;