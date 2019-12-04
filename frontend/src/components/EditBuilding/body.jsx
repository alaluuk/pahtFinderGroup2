import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import GeneralInformation from "./generalInformation";
import Construction from "./construction";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { CURRENT_USER_ID } from '../../constants';
import Typography from '@material-ui/core/Typography';
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";


const GET_STRUCTURE_TYPES = gql`
  query GET_STRUCTURE_TYPES {
    structureTypes {
      id
      title
    }
  }
  `; 

class EditBuilding extends Component {
  state = {
    structureTypes: null, //all available structures types
    triggerSave: false, //inverting this value will trigger saving request in child components
    houseId: 0, //id of house that is currently edited
    errorMessage: '' //will be displayed in case of error
  };

  componentDidMount(){
    //retrieve construction types via withAollo
    console.log("retrieving construction types");
    this.props.client.query({
      query: GET_STRUCTURE_TYPES,
      variables: {},
    }).then(results => {
        console.log("Constructions retrieved:", results);
        this.setState({errorMessage: ''})
        this.setState({structureTypes: results.data.structureTypes});
    })
    .catch(error => {
        console.log("error at retrieving constructions: ", error);
        var err = error.graphQLErrors[0];
        let msg = "Could not retrieve construction types. Please check your internet connection. ("
        if(err){
          this.setState({errorMessage: msg + err.message + ")"})
        }else{
          this.setState({errorMessage: msg + error.toString()  + ")"})
        }
    });
  }

 
  //triggered after succesfull CreateHouse request
  houseIdCallback = (dataFromChild) => {
    this.houseId = dataFromChild;
    console.log("House ID",this.houseId)
  }

  render() {
    if (this.state.errorMessage !== '') { return (
      <Typography variant="subtitle1" component="p" style={{ color: 'red' }} >
        {this.state.errorMessage}
      </Typography>
    ); }
    if (this.state.structureTypes === null) { return "loading ..." }
    return (
      <div className="bodyAdd">
        <div className="overlay">
          <div className="addBuildingComp">
            <div className="addBuildHeader">
              <h1 className="addBuildHeaderText">Add a new building</h1>
            </div>
            {/* Display general information form.
                Callback is used for a new house to retrieve its house id. */}
            <GeneralInformation
              triggerSave={this.state.triggerSave}
              callbackFromParent={this.houseIdCallback}>
            </GeneralInformation>
            <div className="allStructures">
              {/* Display all available structure types */}
              {this.state.structureTypes.map((data, index) => (
                <Construction 
                  constructionTypeTitle = {data.title}
                  constructionTypeId = {data.id}
                  houseId = {this.houseId}
                  triggerSave = {this.state.triggerSave}>
                </Construction>
              ))}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="saveBuildButton"
                  onClick={() => this.setState({ triggerSave: !this.state.triggerSave })}>
                  Save Your Building
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(EditBuilding);
