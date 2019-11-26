import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Selector from "./selector_BuildingType";
import Map from "../Maps/mapAddBuilding";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";



/**
 * Exports form that allows user to fill in general 
 * information about houses (name, location, etc)
 */
class GeneralInformation extends Component {
    state = {  }
    render() { 
        return (  
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
        );
    }
}
 
export default GeneralInformation;