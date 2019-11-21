import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom'
import '../../styles/cardBuilding.scss';


class MediaCard extends Component {
  state = {  }

  constructor(props){ 
    super(props)
    this.state = {
      
    }
  }
  render() { 
    return ( <Link to="/building123">
    <Card className="card" >
      <CardActionArea>
        <CardMedia
          className="media"
          image="https://jooinn.com/images/old-house-35.jpg"
          title="Good House"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Good House
          </Typography>
          <Typography variant="subtitle1" component="p">
            1746
          </Typography>
          <Typography variant="subtitle1" component="p">
            Russia
          </Typography>
            <Slider
                defaultValue={80}
                aria-labelledby="discrete-slider-always"
                valueLabelDisplay="on"
                disabled={true}
            />
        </CardContent>
      </CardActionArea>
    </Card>
    </Link> );
  }
}
 
export default MediaCard;


