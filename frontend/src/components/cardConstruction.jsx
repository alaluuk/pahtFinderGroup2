import React, { Component } from "react";
import "../styles/cardConstruction.scss";
import EditConstruction from "./EditBuilding/editConstruction"
import DeleteConstruction from "./Deletion/body.jsx"


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
    EE: "",
    image: "",
    color: "",
    green: "limegreen",
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
    this.state.image = this.props.image;

    if (this.state.EE <= 35) {
      this.state.color = this.state.red;
    } else if (this.state.EE <= 70) {
      this.state.color = this.state.orange;
    } else if (this.state.EE >= 70) {
      this.state.color = this.state.green;
    }

  }


  editValues(newValues) {
    // add todo
  }

  renderImage() {
    var image = "";
    if (this.state.type == "Roof construction") {
      image = "https://images.unsplash.com/photo-1472342139520-1aa49517fed8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80";
    } else if (this.state.type == "Windows") {
      image = "https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1085&q=80";
    } else if (this.state.type == "Doors") {
      image = "https://images.unsplash.com/photo-1496060875531-64e305199ebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80";
    } else if (this.state.type == "Ground floor") {
      image = "https://abes-online.com/wp-content/uploads/2018/06/fundament1.jpg";
    }
    return image;
  }


  render() {



    return (
      <div className="constructionCard">
        <img
          className="constructionPicture" alt="constructionpicture"
          src={this.renderImage()}
        ></img>

        <div className="conButtons">
          <EditConstruction parentState={this.state} editValues={this.editValues.bind(this)}></EditConstruction>
          <DeleteConstruction parentType={this.state.type} parentTitle={this.state.title}></DeleteConstruction>
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
