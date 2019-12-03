import { GraphQLClient } from 'graphql-request';
import { getAppMode } from './mode';

export const getClientURL = () => {
  return (getAppMode() === 'development') ? 'http://localhost:5000/graphql' : 'https://oamk-pathfinder.herokuapp.com/graphql';
}

const client = new GraphQLClient(getClientURL(), {
  headers: { authorization: '' }
});

export default client;