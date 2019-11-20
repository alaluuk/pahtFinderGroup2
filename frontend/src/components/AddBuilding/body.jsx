import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Selector from "./selector_BuildingType";
import Card from "../card";
import Slider from "@material-ui/core/Slider";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddConstruction from "./addConstruction";
import "../../styles/addConstruction.css";
import '../../styles/addBuilding.scss';



class AddBuilding extends Component {
  state = {};

  render() {
    return (
      <div className="bodyAdd">
        <div className="overlay">
          <div className="addBuildingComp">
            <h1 className="addBuildHead">Add a new building</h1>

            <div className="generalInfo">
              <h2 className="addBuildText"> General Information</h2>

              <div className="generalContent">
                <div className="left">
                  <div className="imageUploader">
                    <ImageUploader className="imageUploader"></ImageUploader>
                  </div>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Name Of Building"
                    margin="normal"
                    variant="outlined"
                  />{" "}
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Construction Year"
                    margin="normal"
                    variant="outlined"
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
                  />{" "}
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="City"
                    margin="normal"
                    variant="outlined"
                  />{" "}
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Country"
                    margin="normal"
                    variant="outlined"
                  />{" "}
                  <br></br>
                </div>
                <div className="right">
                  <Selector></Selector>
                  <img
                    className="googleMaps"
                    src="https://lh3.googleusercontent.com/gRixG4OCS4S7Fb0Ztm8UQVkIaj3z5gKECXOiR2D2ldvS6oZEVfmNuii4tvh-_DjI_qNRJOGO=w640-h400-e365"
                  ></img>
                </div>
              </div>
            </div>
            <div className="allStructures">
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> Roof Construction</h2>
                <AddConstruction type = {"Roof Construction"}></AddConstruction>
                
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={80}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                </div>
              </div>

              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> Outer Wall</h2>
                  <AddConstruction type = {"Outer Wall"}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={80}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                </div>
              </div>

              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> Doors</h2>
                  <AddConstruction type = {"Door"}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={80}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                </div>
              </div>
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> Windows</h2>
                  <AddConstruction type = {"Window"}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={80}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                </div>
              </div>
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> Ground Floor</h2>
                  <AddConstruction type = {"Ground Floor"}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={80}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                  <Card className="card"></Card>
                </div>
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="saveBuildButton"
                  onClick = ""
                >
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
