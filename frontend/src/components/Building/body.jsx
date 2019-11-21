import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import RecommendationRow from "./recommendationRow";
import RecommendationCard from "./cardRecommendation";
import ConstructionCard from "../cardConstruction";
import DiyCard from "./cardDIY";
import Map from "../Maps/mapBuilding";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "../../styles/building.scss";

class Body extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const PrettoSlider = withStyles({
      root: {
        color: "dimgray",
        height: 8
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: "dimgray",
        border: "2px solid white",
        marginTop: -8,
        marginLeft: -12,
        "&:focus,&:hover,&$active": {
          boxShadow: "inherit"
        }
      },
      active: {},
      valueLabel: {
        left: "calc(-50% + 4px)"
      },
      track: {
        borderRadius: 4
      },
      rail: {
        borderRadius: 4
      }
    })(Slider);

    return (
      <div className="bodyBuilding">
        <div className="overlay">
          <div className="building">
            <div className="buildingHeader">
              <h1>Building ABC</h1>
              <Button className="buildingEdit" variant="outlined">
                <EditIcon />
              </Button>
              <Button className="buildingDelete" variant="outlined">
                <DeleteIcon />
              </Button>
              <div className="buildingSlider">
                <PrettoSlider
                  className="material-Slider"
                  valueLabelDisplay="on"
                  aria-label="pretto slider"
                  defaultValue={80}
                  disabled={true}
                />
              </div>
            </div>
            <div className="buildingsContent">
              <div className="buildingInfo">
                <div className="buildInfoLeft">
                  <img
                    className="buildingPicture"
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                  ></img>
                </div>
                <div className="buildInfoCenter">
                  <table>
                    <tr>
                      <td>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Name Of Building"
                          defaultValue="Building ABC"
                          className="buildingSingleInfo"
                          margin="normal"
                        />
                      </td>
                      <td>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Street"
                          defaultValue="Valkyliäly 324"
                          className="buildingSingleInfo"
                          margin="normal"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Construction Year"
                          defaultValue="1950"
                          className="buildingSingleInfo"
                          margin="normal"
                        />
                      </td>
                      <td>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="City"
                          defaultValue="Oulu"
                          className="buildingSingleInfo"
                          margin="normal"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Type of Building"
                          defaultValue="Single House"
                          className="buildingSingleInfo"
                          margin="normal"
                        />
                      </td>
                      <td>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Country"
                          defaultValue="Finnland"
                          className="buildingSingleInfo"
                          margin="normal"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="buildInfoRight">
                  <div className="buildingMap">
                    <Map></Map>
                  </div>
                </div>
              </div>

              <div className="buildingRecommendations">
                <div className="buildingRecoHeader">
                  <h2 className="recoSingleHead"> Currently Installed</h2>
                  <h2 className="recoSingleHeadReco">Recommendations</h2>
                  <h2 className="recoSingleHead"> DIY Tips</h2>
                </div>
                <div className="recoContentAll">


                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        EE="22"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <p className="recoImproveText">+ 20 %</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
                        title="Roof Y6798 Vollholz"
                        amount="1"
                        type="Door"
                        manufacture="Roof GmbH"
                        serial_number="1"
                        u_value="1.2"
                        area="2"
                        production_year="1984"
                        price=""
                        EE="71"
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>{" "}
                    </div>
                  </div>

                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        EE="22"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <p className="recoImproveText">+ 20 %</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
                        title="Roof Y6798 Vollholz"
                        amount="1"
                        type="Door"
                        manufacture="Roof GmbH"
                        serial_number="1"
                        u_value="1.2"
                        area="2"
                        production_year="1984"
                        price=""
                        EE="71"
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>{" "}
                    </div>
                  </div>

                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        EE="22"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <p className="recoImproveText">+ 20 %</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
                        title="Roof Y6798 Vollholz"
                        amount="1"
                        type="Door"
                        manufacture="Roof GmbH"
                        serial_number="1"
                        u_value="1.2"
                        area="2"
                        production_year="1984"
                        price=""
                        EE="71"
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>{" "}
                    </div>
                  </div>

                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        EE="22"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <p className="recoImproveText">+ 20 %</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
                        title="Roof Y6798 Vollholz"
                        amount="1"
                        type="Door"
                        manufacture="Roof GmbH"
                        serial_number="1"
                        u_value="1.2"
                        area="2"
                        production_year="1984"
                        price=""
                        EE="71"
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>{" "}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
