import React, { Component } from 'react';
import Card from './cardBuilding'
import Chart from '../Overview/chart'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Map from '../Maps/mapOverview';
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
                            <Map></Map>
                            <Chart></Chart>

                        </div>
                        
                    </div>
                    </div>
        
                </div> );
    }
}
 
export default Body;