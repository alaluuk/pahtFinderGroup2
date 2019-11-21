import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import CustomRouter from './components/Router/CustomRouter';
import * as serviceWorker from './serviceWorker';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


/**
 * GraphQL Settings
 */
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'https://oamk-pathfinder.herokuapp.com/graphql',
  request: (operation) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});




/**
 * Apllication entry point.
 * Apollo Client is provided to all pages.
 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <CustomRouter>
    </CustomRouter>
  </ApolloProvider>

  ,document.getElementById('root'));

serviceWorker.unregister();
 
