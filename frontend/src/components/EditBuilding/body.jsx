import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import GeneralInformation from "./generalInformation";
import Construction from "./construction";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";

class EditBuilding extends Component {
  state = {
    triggerSave: false, //inverting this value will trigger saving request in generalInformation.jsx
    houseId: 0 //id of house that is currently edited
  };
 
  //triggered after succesfull CreateHouse request
  houseIdCallback = (dataFromChild) => {
    this.houseId = dataFromChild;
    console.log("House ID",this.houseId)
  }

  render() {
    return (
      <div className="bodyAdd">
        <div className="overlay">
          <div className="addBuildingComp">
            <div className="addBuildHeader">
              <h1 className="addBuildHeaderText">Add a new building</h1>
            </div>
            <GeneralInformation
              triggerSave={this.state.triggerSave}
              callbackFromParent={this.houseIdCallback}>
            </GeneralInformation>
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

export default EditBuilding;
