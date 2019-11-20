import React, { Component } from 'react';
import Card from '../card';
import Slider from '@material-ui/core/Slider';
import '../../styles/structure.scss'



class StructureComp extends Component {
    state = {  }


    
    render() { 
        return ( 
          <div className = "allStructures">
                  <div className = "addStructureComp">
                            <h3 className = "addBuildText"> Roof Construction</h3> <br></br>
                            <div className = "mainSlider">
                            <Slider
                              defaultValue={80}
                              aria-labelledby="discrete-slider-always"
                              valueLabelDisplay="on"
                              disabled={true}
                              />
                            </div>
                            <div className = "scrollBar">
                            <Card className = "card" ></Card>
                            </div>
                  </div>

                  <div className = "addStructureComp">
                            <h3 className = "addBuildText"> Outer Wall</h3> <br></br>
                            <div className = "mainSlider">
                            <Slider
                              defaultValue={60}
                              aria-labelledby="discrete-slider-always"
                              valueLabelDisplay="on"
                              disabled={true}
                              />
                            </div>
                            <div className = "scrollBar">
                            <Card className = "card" ></Card>
                            </div>
                  </div>
                  <div className = "addStructureComp">
                            <h3 className = "addBuildText"> Doors</h3> <br></br>
                            <div className = "mainSlider">
                            <Slider
                              defaultValue={40}
                              aria-labelledby="discrete-slider-always"
                              valueLabelDisplay="on"
                              disabled={true}
                              />
                            </div>
                            <div className = "scrollBar">
                            <Card className = "card" ></Card>
                            </div>
                  </div>
                  <div className = "addStructureComp">
                            <h3 className = "addBuildText"> Windows</h3> <br></br>
                            <div className = "mainSlider">
                            <Slider
                              defaultValue={20}
                              aria-labelledby="discrete-slider-always"
                              valueLabelDisplay="on"
                              disabled={true}
                              />
                            </div>
                            <div className = "scrollBar">
                            <Card className = "card" ></Card>
                            </div>
                  </div>
                  <div className = "addStructureComp">
                            <h3 className = "addBuildText"> Ground Floor</h3> <br></br>
                            <div className = "mainSlider">
                            <Slider
                              defaultValue={80}
                              aria-labelledby="discrete-slider-always"
                              valueLabelDisplay="on"
                              disabled={true}
                              />
                            </div>
                            <div className = "scrollBar">
                            <Card className = "card" ></Card>
                            </div>
                  </div>

          </div>
        


       );
    }
}
 
export default StructureComp;