import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Map from "../Maps/mapAddBuilding";
import gql from 'graphql-tag'
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
 * Exports form that allows user to fill in general 
 * information about houses (name, location, etc)
 */
class GeneralInformation extends Component {
    state = { 
        name: '',
        ownerId: localStorage.getItem(CURRENT_USER_ID),
        addressStreet : '',
        addressCountry: '',
        addressCity: '',
        constructionYear: 0,
        heatingSystem: '',
        costOfHeating: 0,
        warmWaterPipe: false,
        errorMessage: ''
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
            console.log("House Created:", results);
            this.props.callbackFromParent(results.data.createHouse.id)
            this.setState({errorMessage: ''})
        })
        .catch(error => {
            console.log("Creat House Error: ", error);
            var err = error.graphQLErrors[0];
            if(err){
              this.setState({errorMessage: err.message})
            }else{
              err = "House could not be saved. Please fill out every field" +
              "and check your internet connection.";
              this.setState({errorMessage: err})
            }
        });
      }
    }

    render() { 
        const {
          errorMessage
        } = this.state;

        return (  
            <div className="generalInfo">
              <h2 className="addBuildText"> General Information</h2>

              <div className="generalContent">
                <div className="left">
                  <div className="imageUploader">
                    <ImageUploader className="imageUploader"></ImageUploader>
                  </div>
                  <TextField
                    autoFocus
                    id="outlined-basic"
                    className="addBuildField"
                    label="Name Of Building"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    className="addBuildField"
                    label="Construction Year"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ constructionYear: parseInt(e.target.value) })}
                  />
                  <br></br>
                </div>
                <div className="center">
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Street"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressStreet: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="City"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressCity: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Country"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressCountry: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Heating system"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ heatingSystem: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    className="addBuildField"
                    label="Yearly cost of heating"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ costOfHeating: parseFloat(e.target.value) })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Warm water pipe"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ warmWaterPipe: (e.target.value === 'true') })}
                  />
                  <br></br>
                </div>
                <div className="right">
                  <Map></Map>
                </div>
                <Typography variant="subtitle1" component="p" style={{ color: 'red' }} >
                  {errorMessage}
                </Typography>
              </div>
            </div>
        );
    }
}
 
export default withApollo(GeneralInformation);