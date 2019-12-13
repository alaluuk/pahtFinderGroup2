import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import GeneralInformation from "./generalInformation";
import ConstructionContainer from "./constructionContainer";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
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
    houseId: this.props.houseId, //id of house that is currently edited
    errorMessage: '' //will be displayed in case of graphql error
  };

  componentDidMount(){
    this.setState({houseId: this.props.houseId})
    //retrieve construction types via withAollo
    console.log("retrieving construction types");
    this.props.client.query({
      query: GET_STRUCTURE_TYPES,
      variables: {},
    }).then(results => {
        console.log("Construction types retrieved:", results);
        this.setState({errorMessage: ''})
        this.setState({structureTypes: results.data.structureTypes});
    })
    .catch(error => {
        console.log("error at retrieving construction types: ", error);
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
    this.setState({houseId: dataFromChild});
    console.log("House ID",this.state.houseId)
  }

  render() {
    {/* Displaying in progress or errors*/}
    if (this.state.errorMessage !== '') { return (
      <Typography variant="subtitle1" component="p" style={{ color: 'red' }} >
        {this.state.errorMessage}
      </Typography>
    ); }
    if (this.state.structureTypes === null) { return "loading ..." }
    {/* Displaying main form*/}
    return (
      <div className="bodyAdd">
        <div className="overlay">
          <div className="addBuildingComp">
            <div className="addBuildHeader">
              <h1 className="addBuildHeaderText">Add a new building</h1>
            </div>
            {/* Display general information form.
                Callback is used to retrieve the id of a newly created house. */}
            <GeneralInformation
              triggerSave={this.state.triggerSave}
              houseId = {this.state.houseId}
              callbackFromParent={this.houseIdCallback}>
            </GeneralInformation>
            {/* Display all available structure types
                forms only if house id is already available */}
            {this.state.houseId ? (
            <div className="allStructures">
              {this.state.structureTypes.map((data) => (
                <ConstructionContainer 
                  constructionTypeTitle = {data.title}
                  constructionTypeId = {data.id}
                  houseId = {this.state.houseId}>
                </ConstructionContainer>
              ))}
                <Button
                  variant="contained"
                  color="primary"
                  className="saveBuildButton"
                  onClick={() => this.setState({ triggerSave: !this.state.triggerSave })}>
                  Show Result
                </Button>
            </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="saveBuildButton"
                  onClick={() => this.setState({ triggerSave: !this.state.triggerSave })}>
                  Save General Information
                </Button>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(EditBuilding);
