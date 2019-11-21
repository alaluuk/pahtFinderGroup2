import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../../styles/cardRecommendation.scss";


class Card extends Component {
  state = {
    id: 0,
    type: "",
    title: "",
    manufacture: "",
    u_value: "",
    area: "",
    amount: "",
    production_year: "",
    price: "",
    EE: 0,
    color: "white",
    green: "darkgreen",
    orange: "orange",
    red: "red",
  };

  constructor(props) {
    super(props);
    this.state.type = this.props.type;
    this.state.title = this.props.title;
    this.state.manufacture = this.props.manufacture;
    this.state.u_value = this.props.u_value;
    this.state.area = this.props.area;
    this.state.amount = this.props.amount;
    this.state.production_year = this.props.production_year;
    this.state.price = this.props.price;
    this.state.EE = this.props.EE;
    this.state.isReco = this.props.isReco;

    console.log("Props: " + this.props.EE);
    console.log("State: " + this.state.EE);

    if (this.state.EE <= 35) {
      this.state.color = this.state.red;
    } else if (this.state.EE <= 70) {
      this.state.color = this.state.orange;
    } else if (this.state.EE >= 70) {
      this.state.color = this.state.green;
      console.log("Over 70");
    }

  }

  render() {

    return (
      <div className="recommendationCard">
        <img
          className="recommendationPicture"
          src="https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80"
        ></img>



                     <div className = "recoButtons">
                     <Button className="recoOffer" variant="outlined">
                       Show on marketplace
                     </Button>
    
                   </div>

       

        <div className="recoContent">
          <div className="recoLeft">
            <h3 className="recoTitle"> {this.state.type} </h3>
            <h4>{this.state.title}</h4>
            <h4>{this.state.manufacture}</h4>
            <h4>U-Value: {this.state.u_value}</h4>
            <h4>Size: {this.state.area} qm2</h4>
          </div>
          <div className="recoRight">
          <div
              className="recoCircle"
              style={{ backgroundColor: this.state.color }}
            >
              {this.state.EE}%
            </div>
            <h3 className="recoTitle"> {this.state.amount}x</h3>
            <h4> {this.state.production_year}</h4>
            <h4> {this.state.price}</h4>

            
          </div>
        </div>
      </div>
    );
  }
}

export default Card;