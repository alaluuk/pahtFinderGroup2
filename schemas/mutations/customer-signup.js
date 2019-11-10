const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { User } = require("../../models");
const { AuthPayloadType } = require("../types");

const CustomerSignupSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

const CustomerSignupMutation = {
  type: AuthPayloadType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(_, args) {
    let values = Joi.attempt(args, CustomerSignupSchema);
    return new Promise(function(resolve, reject) {
      User.create(values.name, values.email, values.password, "customer")
      .then(user => {
        resolve({
          token: JWT.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          ),
          user: user
        });
      })
      .catch(err => {
        if(err.code == '23505') reject(new Error("This email address is already being used."));
        reject(err);
      });
    });
  }
};

exports.CustomerSignupSchema = CustomerSignupSchema;
exports.CustomerSignupMutation = CustomerSignupMutation;