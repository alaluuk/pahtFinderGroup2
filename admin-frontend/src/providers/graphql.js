import Cookies from 'js-cookie';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient("https://oamk-pathfinder.herokuapp.com/graphql", {
  headers: {
    // TODO: Dynamically fetch the JWT from the auth provider
    authorization: (Cookies.get('__session_jwt')) ? 'Bearer ' + Cookies.get('__session_jwt') : ''
  },
});

export default client;
