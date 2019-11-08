import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import '../styles/card.css';


export default function MediaCard() {

  return (
    <div className="addCard">
     
     <div className = "addCardContent">
            <p className = "addCardLetters">+</p>
            <p className = "addCardLetters">Add New</p>
       </div>
            
        
    </div>
  );
}