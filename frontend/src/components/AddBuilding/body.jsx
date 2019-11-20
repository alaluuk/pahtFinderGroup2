import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ImageUploader from './imageUploader';
import Selector from './simpleSelector';
import Structure from './structure';
import '../../styles/addBuilding.scss';

class AddBuilding extends Component {
    state = {  }  
    
    render() { 
        return (  
            
            <div className = "bodyAdd">
            <div className = "overlay">
            <div className = "addBuildingComp"> 
                <h2 className = "addBuildHead">Add a new building</h2> <br></br>
                
                <h3 className = "addBuildText"> General Information</h3> <br></br>

                <div className = "addBuildBody">
                    <div className = "left">
                    <div className = "imageUploader">
                              <ImageUploader className = "imageUploader"></ImageUploader>
                        </div>
                        <TextField id="outlined-basic" className= "addBuildField" label="Name Of Building" margin="normal" variant="outlined" /> <br></br>
                        <TextField id="outlined-basic" className= "addBuildField" label="Construction Year" margin="normal" variant="outlined" /> <br></br>
                    </div>
                    <div className = "center">
                    <TextField id="outlined-basic" className= "addBuildField" label="Street" margin="normal" variant="outlined" /> <br></br>
                    <TextField id="outlined-basic" className= "addBuildField" label="City" margin="normal" variant="outlined" /> <br></br>
                    <TextField id="outlined-basic" className= "addBuildField" label="Country" margin="normal" variant="outlined" /> <br></br>
                    </div>
                    <div className = "right">
                   <Selector></Selector>
                    <img className = "googleMaps" src = "https://lh3.googleusercontent.com/gRixG4OCS4S7Fb0Ztm8UQVkIaj3z5gKECXOiR2D2ldvS6oZEVfmNuii4tvh-_DjI_qNRJOGO=w640-h400-e365"></img>
                    </div>
                   </div>

                   <Structure></Structure>
                
                </div>

        </div>
        </div>
        
                

            
        );
    }
}
 
export default AddBuilding;