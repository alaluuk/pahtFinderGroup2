import React, { Component } from "react";
import ConstructionCard from "../cardConstruction";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import AddConstruction from "./addConstruction";
import GeneralInformation from "./generalInformation";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";

class AddBuilding extends Component {
  state = {
    roofEE: 1,
    outerWallEE: 20,
    doorsEE: 50,
    windowsEE: 100,
    groundFloorEE: 70,
    roof: "Roof Construction",
    wall: "Outer Wall",
    door: "Door",
    window: "Window",
    groundFloor: "Ground Floor",
    roofs: [],
    walls: [],
    doors: [],
    windows: [],
    groundfloors: []
  };

  render() {
    return (
      <div className="bodyAdd">
        <div className="overlay">
          <div className="addBuildingComp">
            <div className="addBuildHeader">
              <h1 className="addBuildHeaderText">Add a new building</h1>
            </div>

              <GeneralInformation></GeneralInformation>
            
            <div className="allStructures">
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.roof}</h2>
                  <AddConstruction parentType={this.state.roof} parentState={this.state.doors}></AddConstruction>
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
                  <div className="scrollItem">
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type={this.state.roof}
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "100"
                    ></ConstructionCard>{" "}
                  </div>

                  <div className="scrollItem">
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "90"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price="300"
                      EE = "70"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "60"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "50"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "40"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "20"
                    ></ConstructionCard>
                  </div>
                </div>
              </div>

              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.wall}</h2>
                  <AddConstruction parentType={this.state.wall}></AddConstruction>
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
                <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "40"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "40"
                    ></ConstructionCard>
                  </div>
                  <div className="scrollItem">
                    {" "}
                    <ConstructionCard
                      title="Roof Y6798 Vollholz"
                      amount="1"
                      type="Door"
                      manufacture="Roof GmbH"
                      serial_number="1"
                      u_value="1.2"
                      area="2"
                      production_year="1984"
                      price=""
                      EE = "100"
                    ></ConstructionCard>
                  </div>
                  
                </div>
              </div>

              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.door}s</h2>
                  <AddConstruction parentType={this.state.door}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.doorsEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar"></div>
              </div>
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.window}s</h2>
                  <AddConstruction parentType={this.state.window}></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.windowsEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar"></div>
              </div>
              <div className="addStructureComp">
                <div className="addStructureHead">
                  <h2 className="addBuildText"> {this.state.groundFloor}</h2>
                  <AddConstruction
                    parentType={this.state.groundFloor}
                  ></AddConstruction>
                </div>

                <div className="mainSlider">
                  <Slider
                    defaultValue={this.state.groundFloorEE}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    disabled={true}
                  />
                </div>
                <div className="scrollBar"></div>
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="saveBuildButton"
                  onClick=""
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
