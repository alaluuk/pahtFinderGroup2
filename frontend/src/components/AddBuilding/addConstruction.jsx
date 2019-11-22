import React, { Component } from 'react';
import Popup from "reactjs-popup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../../styles/addConstruction.scss";
import Selector from "./selector_ProductionYear";


class AddConstruction extends Component {
    state = {  
       
    }

    
    render() { 

        return (  <div>
  <Popup
                    trigger={
                      <Button className="addNewPlusButton" variant="outlined">
                        + Add New
                      </Button>
                    }
                    modal
                  >
                    {close => (
                      <div className="modal">
                        <a className="close" onClick={close}>
                          &times;
                        </a>
                        <div className="addConstructionContent">
                          <h2 className="addConstructionText">
                            {" "}
                            Add A New {this.props.type}
                          </h2>

                          <table className ="addConstructionTable">
                          <tbody>
                            <tr>
                              <td>
                                <TextField
                                  id="outlined-basic"
                                  className="addBuildField"
                                  label="Type"
                                  margin="normal"
                                  variant="outlined"
                                />
                              </td>
                              <td>
                                <TextField
                                  id="outlined-basic"
                                  className="addBuildField"
                                  label="U-Value"
                                  margin="normal"
                                  variant="outlined"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <TextField
                                  id="outlined-basic"
                                  className="addBuildField"
                                  label="Manufacture"
                                  margin="normal"
                                  variant="outlined"
                                />
                              </td>
                              <td>
                                <TextField
                                  id="outlined-basic"
                                  className="addBuildField"
                                  label="Area"
                                  margin="normal"
                                  variant="outlined"
                                />
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <TextField
                                  id="outlined-basic"
                                  className="addBuildField"
                                  label="Serial Number"
                                  margin="normal"
                                  variant="outlined"
                                />
                              </td>
                              <td>
                                <Selector></Selector>
                              </td>
                              <td></td>
                            </tr>
                            </tbody>
                          </table>

                          <Button 
                            variant="contained"
                            color="primary"
                            className="saveConstructionButton"
                            onClick={() => {
                              close();
                            }}
                          >
                            Save {this.props.type}
                          </Button>
                        </div>
                      </div>
                    )}
                  </Popup>


        </div>);
    }
}
 
export default AddConstruction;