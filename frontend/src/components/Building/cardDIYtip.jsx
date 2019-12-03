import React, { Component } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Modal from '@material-ui/core/Modal';


class DIYTip extends Component {
    state = { 

        id: 0,
        open: false

     }

    

    
    render() { 

       
        return ( <div>

      <ListItem id = {this.state.id} button onClick={this.handleOpen}>
          <ListItemText primary={this.state.likes} secondary = "Likes" />
            <ListItemText primary={this.state.type} secondary = "Type"/>
            <ListItemText id primary={this.state.header} secondary = "Description"/>
            <ListItemText id primary={this.state.date} secondary = "Added on"/>
            <IconButton>
                <FavoriteIcon/>
            </IconButton>
          </ListItem>



        </div> );
    }
}
 
export default DIYTip;