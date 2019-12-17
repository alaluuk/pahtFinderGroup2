import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Modal from '@material-ui/core/Modal';
import "../../styles/cardDIY.scss";

class Card extends Component {
  state = {

    id: 0,
    type: "Door",
    header: "How to fix door by sfhsifuifherbferfouieiufeihufiuewfiuew",
    likes: 1212,
    date: "Mar 3 '13",


  };



  render() {



    return (
      <div className="diyCard">
        <List component="nav" className="" aria-label="contacts">
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>
          <ListItem id={this.state.id} button>
            <ListItemText primary={this.state.likes} secondary="Likes" />
            <ListItemText primary={this.state.type} secondary="Type" />
            <ListItemText id primary={this.state.header} secondary="Description" />
            <ListItemText id primary={this.state.date} secondary="Added on" />
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </ListItem>

        </List>


      </div>
    );
  }
}

export default Card;
