import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient("https://oamk-pathfinder.herokuapp.com/graphql", {
  headers: { authorization: '' }
});

export default client;
