import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Selector from "./selector_BuildingType";
import Map from "../Maps/mapAddBuilding";
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo'
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";
import { CURRENT_USER_ID } from '../../constants';


const CREATE_HOUSE = gql`
  mutation createHouse($name: String!, $ownerId: ID!, $addressStreet: String!, $addressCountry: String!, $addressCity:String!, $constructionYear:Int!,
    $heatingSystem:String!, $costOfHeating: Float!, $warmWaterPipe: Boolean!) {
    createHouse(name: $name, ownerId: $ownerId, addressStreet: $addressStreet, addressCountry: $addressCountry, addressCity: $addressCity,
        constructionYear: $constructionYear, heatingSystem: $heatingSystem, costOfHeating: $costOfHeating, warmWaterPipe: $warmWaterPipe) {
        id
    }
  }
`

/**
 * Exports form that allows user to fill in 
 * information about constructions (roof or wall etc.)
 */
class Construction extends Component {
    state = { 
        ownerId: localStorage.getItem(CURRENT_USER_ID),
     }

    
    componentDidUpdate(prevProps) {
      //execute create new House mutation
      if (this.props.triggerSave !== prevProps.triggerSave) {
        console.log("save House Clicked!")
        this.props.client.mutate({
          mutation: CREATE_HOUSE,
          variables: {
              name: this.state.name,
              ownerId: localStorage.getItem(CURRENT_USER_ID),
              addressStreet: this.state.addressStreet,
              addressCountry: this.state.addressCountry,
              addressCity: this.state.addressCity,
              constructionYear: this.state.constructionYear,
              heatingSystem: this.state.heatingSystem,
              costOfHeating: this.state.costOfHeating,
              warmWaterPipe: this.state.warmWaterPipe
          },
        }).then(results => {
            console.log(results);
            this.setState({errorMessage: ''})
        })
        .catch(error => {
            console.log("Creat House Error: ", error);
            this.setState({errorMessage: error.graphQLErrors[0].message})
        });
      }
    }

    render() { 
        const {
          errorMessage
        } = this.state;

        return (


        );
    }
}
 
export default withApollo(Construction);