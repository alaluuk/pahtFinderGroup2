import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "../styles/cardConstruction.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import { red } from "@material-ui/core/colors";
import { NONAME } from "dns";
import shadows from "@material-ui/core/styles/shadows";

class Card extends Component {
  state = {
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
    red: "red"
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
      <div className="constructionCard">
        <img
          className="constructionPicture"
          src="https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80"
        ></img>

        <div className = "conButtons">
          <Button className="conEdit" variant="outlined">
            <EditIcon />
          </Button>
          <Button className="conDelete" variant="outlined">
            <DeleteIcon />
          </Button>
        </div>

        <div className="conContent">
          <div className="conLeft">
            <h3 className="conTitle"> {this.state.type} </h3>
            <h4>{this.state.title}</h4>
            <h4>{this.state.manufacture}</h4>
            <h4>U-Value: {this.state.u_value}</h4>
            <h4>Size: {this.state.area} qm2</h4>
          </div>
          <div className="conRight">
          <div
              className="conCircle"
              style={{ backgroundColor: this.state.color }}
            >
              {this.state.EE}%
            </div>
            <h3 className="conTitle"> {this.state.amount}x</h3>
            <h4> {this.state.production_year}</h4>
            <h4> {this.state.price}</h4>

            
          </div>
        </div>
      </div>
    );
  }
}

export default Card;