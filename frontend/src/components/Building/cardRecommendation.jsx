import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
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
    green: "limegreen",
    orange: "orange",
    red: "red",
    liked: false,
    likeColor: "disabled",
    likeColorDefault: "rgba(0, 0, 0, 0.54)",
    likeColorLike: "error"
  }

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

    if (this.state.EE <= 35) {
      this.state.color = this.state.red;
    } else if (this.state.EE <= 70) {
      this.state.color = this.state.orange;
    } else if (this.state.EE >= 70) {
      this.state.color = this.state.green;

    }

  }

  renderImage() {
    var image = "";
    if (this.state.type == "Roof construction") {
      image = "https://images.unsplash.com/photo-1528223871781-8f4c984f6164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
    } else if (this.state.type == "Windows") {
      image = "https://images.unsplash.com/photo-1551524163-d00af9f12253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80";
    } else if (this.state.type == "Doors") {
      image = "https://images.unsplash.com/photo-1500281781950-6cd80847ebcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
    } else if (this.state.type == "Ground floor") {
      image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Foundation-M2325.jpg/1200px-Foundation-M2325.jpg";
    }
    return image;
  }

  render() {


    return (
      <div className="recommendationCard">
        <img
          className="recommendationPicture"
          src={this.renderImage()}
          alt="recommendationPicture"

        ></img>

        <div className="recoButtons">
          <Button className="recoOffer" variant="outlined">
            <LocalGroceryStoreIcon></LocalGroceryStoreIcon> &nbsp; Show on marketplace
          </Button>
          <Button className="recoLike" variant="outlined" onClick={this.like}>
            <FavoriteIcon color={this.state.likeColor} />  &nbsp; Like
          </Button>

        </div>

        <div className="recoContent">
          <div className="recoLeft">
            <h3 className="recoTitle"> {this.state.type} </h3>
            <h4>{this.state.title}</h4>
            <h4>{this.state.manufacture}</h4>
            <h4>U-Value: {this.state.u_value}</h4>
            <h4>Price: {this.state.price} €</h4>
          </div>
          <div className="recoRight">
            <div
              className="recoCircle"
              style={{ backgroundColor: this.state.color }}
            >
              {this.state.EE}%
            </div>
            <h3 className="recoTitle"> {this.state.amount}x</h3>
            <h4> Year: {this.state.production_year}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
