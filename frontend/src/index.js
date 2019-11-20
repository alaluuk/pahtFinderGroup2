import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import CustomRouter from './components/customRouter';
import * as serviceWorker from './serviceWorker';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache;
const client = new ApolloClient({
  cache,
  uri: 'https://oamk-pathfinder.herokuapp.com/graphql'
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});

ReactDOM.render(
  
  <ApolloProvider client={client}>
    <CustomRouter></CustomRouter>
  </ApolloProvider>

  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 
