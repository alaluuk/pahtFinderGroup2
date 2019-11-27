import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient("http://localhost:5000/graphql", { // TODO: Change back to production: https://oamk-pathfinder.herokuapp.com/graphql
  headers: { authorization: '' }
});

export default client;