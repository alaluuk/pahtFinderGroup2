import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CustomRouter from './components/CustomRouter';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://oamk-pathfinder.herokuapp.com/graphql'
});


ReactDOM.render(
  <CustomRouter>
  <ApolloProvider client={client}><routing/></ApolloProvider>
  </CustomRouter>
  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 