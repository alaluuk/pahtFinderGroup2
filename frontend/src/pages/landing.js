import React from 'react';
import '../styles/landing.css';
import Header from '../components/header';
import Body from '../components/LandingPage/body';
import Footer from '../components/footer';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import { Query } from "react-apollo";





const login = gql `
{
  login(
        email: "admin@pathfinder-demo.com",
        password: "testpw"
        # longLived: true
    ) {
    token
    user {
        id
        name
        role
        permissions
    }
  }
}
`;

class Landing extends React.Component {
    render() {
        return (
            <div className="Landing">
              <Header></Header>
              <Body></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Landing