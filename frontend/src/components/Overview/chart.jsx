import React, { Component } from 'react';
import '../../styles/overview.css';

class Chart extends Component {
    state = {  }


    constructor(props, percent){
        super(props)
        this.state = {percent: 70};

    }

    render() { 
        return ( 
            <div className = "chart">
                <h1 className ="chartText" percent={this.state.percent} > Overall <br></br>{this.state.percent} % </h1>

            </div>

         );
    }
}
 
export default Chart;