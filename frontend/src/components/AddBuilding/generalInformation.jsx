import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Selector from "./selector_BuildingType";
import Map from "../Maps/mapAddBuilding";
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo'
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";


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
        name: 'aa',
        ownerId: "b13f1f1f-bb9e-45bb-90d8-e74d94c493fc",
        addressStreet : 'aa',
        addressCountry: 'aa',
        addressCity: 'aa',
        constructionYear: 0,
        heatingSystem: 'aa',
        costOfHeating: 0,
        warmWaterPipe: false,
        errorMessage: 'aa'
     }
    render(props) { 
        const {
        name,
        ownerId,
        addressStreet,
        addressCountry,
        addressCity,
        constructionYear,
        heatingSystem,
        costOfHeating,
        warmWaterPipe,
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
                  />{" "}
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Construction Year"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ constructionYear: e.target.value })}
                  />{" "}
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
                  />{" "}
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="City"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressCity: e.target.value })}
                  />{" "}
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Country"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressCountry: e.target.value })}
                  />{" "}
                  <br></br>
                </div>
                {errorMessage}
                <Mutation
                            mutation={CREATE_HOUSE}
                            variables={{ name, ownerId, constructionYear, addressStreet, addressCity, addressCountry,
                                costOfHeating, heatingSystem, warmWaterPipe}}
                            onCompleted={data => this.setState({ errorMessage: data.graphQLErrors })}
                            onError={data => this.setState({ errorMessage: data.graphQLErrors })}
                        >
                            {mutation => (
                                <Button onClick={mutation}>
                                    Execute Mutation
                                </Button>
                            )}
                </Mutation>

                <div className="right">
                  <Selector></Selector>
                  <Map></Map>
                </div>
              </div>
            </div>
        );
    }
}
 
export default GeneralInformation;