import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import RecommendationRow from "./recommendationRow";
import ConstructionCard from "../cardConstruction";
import Map from "../Maps/mapBuilding";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import "../../styles/building.css";

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
      <div className="bodyOverview">
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
                  <Map></Map>
                </div>
              </div>

              <div className="buildingRecommendations">
                  <table>
                      <th className = "recommendationColumn"> <h2>Currently Installed</h2></th>
                      <th className = "recommendationColumn"> <h2>Recommendations</h2></th>
                      <th className = "recommendationColumn" ><h2>DIY Tips</h2></th>
                  </table>
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
                EE = "71"
                ></ConstructionCard>


{/*  title: "Roof Y6798 Vollholz",
      amount: 1,
      type: "Door",
      manufacture: "Roof GmbH",
      serial_number: 1,
      u_value: 1.2,
      area: 2,
      production_year: 1984,
      price: 200 */}


              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
