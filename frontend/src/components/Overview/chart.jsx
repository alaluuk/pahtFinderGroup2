import React, { Component } from 'react';
import '../../styles/overview.scss';

class Chart extends Component {
    state = { 
        EE: "",
        color: "",
    green: "darkgreen",
    orange: "orange",
    red: "red"

     }


    constructor(props){
        super(props)
        this.state.totalEE = this.props.totalEE;

        if (this.state.EE <= 35) {
            this.state.color = this.state.red;
          } else if (this.state.EE <= 70) {
            this.state.color = this.state.orange;
          } else if (this.state.EE >= 70) {
            this.state.color = this.state.green;
          }

    }

    render() { 
        return ( 
            <div className = "chart" style={{ backgroundColor: this.state.color }}>
                <p className ="chartText" > Overall <br></br>{this.state.EE} % </p>

            </div>

         );
    }
}
 
export default Chart;