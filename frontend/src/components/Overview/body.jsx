import React, { Component } from 'react';
import Card from '../card';
import Chart from '../Overview/chart'
import { Link } from 'react-router-dom'
import { FiPlusSquare } from "react-icons/fi"
import Button from '@material-ui/core/Button';
import '../../styles/overview.css';

class Body extends Component {
    state = {  }
    render() { 
        return ( <div className = "bodyOverview">
            <div className = "overlay">
                    <div className = "content">
                        <div className = "headLine">
                        <h1 className = "overviewHeader">My buildings</h1>
                        <Link to = "/addBuilding" className = "addNewPlusButton"> 
                            <Button variant="outlined" className="no">
                                + Add New
                            </Button> 
                        </Link>
                        </div>
                        

                        <div className = "scrollBars">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        </div>

                        <div className = "bottomContent">
                            <img className = "map" src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"></img>
                            <Chart></Chart>

                        </div>
                        
                    </div>
                    </div>
        
                </div> );
    }
}
 
export default Body;