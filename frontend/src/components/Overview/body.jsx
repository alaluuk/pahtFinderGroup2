import React, { Component } from 'react';
import Card from '../card';
import AddCard from '../addCard';
import '../../styles/overview.css';

class Body extends Component {
    state = {  }
    render() { 
        return ( <div className = "bodyOverview">
            <div className = "overlay">
                    <div className = "content">
                        <h1 className = "overviewHeader">My buildings</h1>
                        <div className = "scrollBars">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <AddCard></AddCard>
                        </div>

                        <div className = "bottomContent">
                            <img className = "map" src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"></img>
                            <h1>hello</h1>

                        </div>
                        
                    </div>
                    </div>
        
                </div> );
    }
}
 
export default Body;