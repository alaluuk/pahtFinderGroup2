// const bcrypt = require('bcrypt');
const { db } = require("../pg-adaptor");
const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");
const { UserType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        // TODO: Check permissions, sanitize & check all inputs (especially role!)
        const query = `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [
          args.name,
          args.email,
          args.password, // bcrypt.hashSync(args.password, 10),
          args.role
        ];
        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;