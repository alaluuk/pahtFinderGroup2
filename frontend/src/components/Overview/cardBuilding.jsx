import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import '../../styles/cardBuilding.scss';


class MediaCard extends Component {
  state = { 

    id: "",
    image: "",
    title: "",
    year: "",
    country: "",
    EE: "",
    color: "",
    green: "limegreen",
    orange: "orange",
    red: "red"

     
   }

  constructor(props){ 
    super(props)
    this.state.id = this.props.id;
    this.state.image = this.props.image
    this.state.title = this.props.title
    this.state.year = this.props.year
    this.state.country = this.props.country
    this.state.EE = this.props.EE

    if (this.state.EE <= 35) {
      this.state.color = this.state.red;
    } else if (this.state.EE <= 70) {
      this.state.color = this.state.orange;
    } else if (this.state.EE >= 70) {
      this.state.color = this.state.green;
    }
      
  }
  render() { 
    return ( <Link to={{
      pathname: '/result',
      state: {
        buildingID: this.state.id,
        buildingImage: this.state.image,
        EEValue: this.state.EE
        
      }
    }}>
    <Card className="card" >
      <CardActionArea>
        <CardMedia
          className="media"
          image={this.state.image}
          title="Good House"
        />
        <CardContent>
          <div className = "buildingCardContent">
          <div className = "buildingCardConLeft">
          <Typography gutterBottom variant="h5" component="h2">
            {this.state.title}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {this.state.year}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {this.state.country}
          </Typography>
          </div>
          <div className = "buildingCardConRight">
          <div
              className="conCircle"
              style={{ backgroundColor: this.state.color }}
            >
              {this.state.EE}%
            </div>
          

          </div>
          </div>
          
         
            
        </CardContent>
      </CardActionArea>
    </Card>
    </Link> );
  }
}
 
export default MediaCard;


