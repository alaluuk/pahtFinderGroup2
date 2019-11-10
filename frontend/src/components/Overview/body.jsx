import React, { Component } from 'react';
import Card from '../card';

class Body extends Component {
    state = {  }
    render() { 
        return ( <div className = "body">
                    <div className = "content">
                        <h1>Overview</h1>
                        <Card></Card>
                    </div>
        
                </div> );
    }
}
 
export default Body;