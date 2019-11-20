import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import '../../styles/building.css';


class Body extends Component {
    state = {  }

    constructor(props){
        super(props)
            
    }

    render() { 

        
        return (  
        <div>
            <div className = "buildingHeader">
                <h1>Building ABC</h1>
                <Button className="buildingEdit" variant="outlined">
                        Edit
                      </Button>

            </div>
            <div>
                
            </div>
            
        </div>);
    }
}
 
export default Body;