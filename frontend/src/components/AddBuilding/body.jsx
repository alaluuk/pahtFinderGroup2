import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import GeneralInformation from "./generalInformation";
import Construction from "./construction";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";

class AddBuilding extends Component {
  state = {
    triggerSave: false //inverting this value will trigger saving requests in child components 
  };

  render() {
    return (
      <div className="bodyAdd">
        <div className="overlay">
          <div className="addBuildingComp">
            <div className="addBuildHeader">
              <h1 className="addBuildHeaderText">Add a new building</h1>
            </div>
            <GeneralInformation triggerSave={this.state.triggerSave}></GeneralInformation>
            <div className="allStructures">
              <Construction name="Roof"></Construction>
              <Construction name="Outer wall"></Construction>
              <Construction name="Doors"></Construction>
              <Construction name="Windows"></Construction>
              <Construction name="Ground Floor"></Construction>
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

export default AddBuilding;
