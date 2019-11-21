import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Selector from "./selector_BuildingType";
import ConstructionCard from "../cardConstruction";
import Slider from "@material-ui/core/Slider";
import Map from "../Maps/mapAddBuilding";
import Button from "@material-ui/core/Button";
import AddConstruction from "./addConstruction";
import "../../styles/addConstruction.scss";
import '../../styles/addBuilding.scss';

class AddBuilding extends Component {
  state = {

    roofEE: 1,
    outerWallEE : 20,
    doorsEE: 50,
    windowsEE: 100,
    groundFloorEE: 70,
    roof: "Roof Construction",
    wall: "Outer Wall",
    door: "Door",
    window: "Window",
    groundFloor: "Ground Floor"

  };


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
                  <Map></Map>
                </div>
              </div>
            </div>
            <div className="allStructures">
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.roof}</h2>
                <AddConstruction type = {this.state.roof}></AddConstruction>
                
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.roofEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
    
                  <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = {this.state.roof}
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = "Door"
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                 <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = "Door"
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "300" 
                ></ConstructionCard>
                 <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = "Door"
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                 <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = "Door"
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                 <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = "Door"
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                 <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = "Door"
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                  
                </div>
              </div>

              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.wall}</h2>
                  <AddConstruction type = {this.state.wall}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.outerWallEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                <ConstructionCard 
                title = "Roof Y6798 Vollholz"
                amount = "1"
                type = {this.state.roof}
                manufacture = "Roof GmbH"
                serial_number = "1"
                u_value = "1.2"
                area ="2"
                production_year ="1984"
                price = "" 
                ></ConstructionCard>
                </div>
              </div>

              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.door}s</h2>
                  <AddConstruction type = {this.state.door}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.doorsEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  
                  
                </div>
              </div>
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.window}s</h2>
                  <AddConstruction type = {this.state.window}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.windowsEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                 
                </div>
              </div>
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.groundFloor}</h2>
                  <AddConstruction type = {this.state.groundFloor}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.groundFloorEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar">
                  
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
