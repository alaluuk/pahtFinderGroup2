import React, { Component } from "react";
import "../../styles/addConstruction.scss";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";

export default function Delete ({ id, parentType, parentTitle }){
    const [open, setOpen] = React.useState(false);
    const [editingDisabled] = React.useState((window.location.pathname == "/result"));

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
          <Button className="buildingDelete" variant="outlined" onClick={handleClickOpen} disabled={editingDisabled}>
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
            <Button onClick={handleClose} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }