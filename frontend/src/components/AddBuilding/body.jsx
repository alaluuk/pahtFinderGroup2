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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1531481517150-2228446fb6b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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
                      image = "https://images.unsplash.com/photo-1531481517150-2228446fb6b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
                      image = "https://images.unsplash.com/photo-1531481517150-2228446fb6b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

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
