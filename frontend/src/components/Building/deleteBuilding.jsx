import React, { Component } from "react";
import "../../styles/addConstruction.scss";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import {Route} from "react-router-dom";
import Overview from "../../pages/overview"
import gql from 'graphql-tag'

const DELETE_HOUSE = gql`
  mutation DELETE_HOUSE($id: ID!){
    deleteHouse(id: $id)
}
  `;

export default function DeleteHouse ({props, id, parentType, parentTitle}){
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(id);

    const handleClickOpen = () => {
      setOpen(true);
      console.log("House ID: " + deleteId);
    };
  
    const handleClose = () => {
      setOpen(false);
    };  

    return (
      <div>
          <Button className="buildingDelete" variant="outlined" onClick={handleClickOpen}>
                <DeleteIcon />  &nbsp; Delete
              </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="sm"
      maxWidth="sm"
      minWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Delete {parentType} : {parentTitle} </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you really sure you want to delete {parentTitle}? <br></br>
            When you do this, all items associated with it will be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            
            <Mutation
            mutation={DELETE_HOUSE}
            variables={{ id }}
            onCompleted={handleClose}
            onError=""
          >
            {mutation => ( 

<Link to={{
      pathname: '/overview',
      state: {
        refresh: true
      }
      
    }}  >
            <Button onClick={mutation} color="primary" autoFocus>
              
              Delete
        
              
            </Button>
            </Link>
    
            
            )}
            </Mutation>
 

          </DialogActions>
        </Dialog>
      </div>
    );
            }
