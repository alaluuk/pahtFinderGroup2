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

export default function Delete ({ id, type }){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
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
          <DialogTitle id="alert-dialog-title"> Delete {type} </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you really sure you want to delete this {type}? <br></br>
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




{/*  <Dialog 
      fullWidth="md"
      maxWidth="md"
      minWidth="md"
      open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
        <div className = "deleteDialog">
        <DialogTitle id="form-dialog-title"> Delete {type} 
        
        </DialogTitle>
        <DialogContent >
        
          <DialogContentText>
           Are you really sure you want to delete {type}?
          </DialogContentText>
         
        </DialogContent>
        <DialogActions className = "deleteActions">
          <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}  className = "deleteButton"
                  
                >
                  Delete {type}
                </Button>

                <Button onClick={handleClose} color="primary" className = "closeButton">
            Close
          </Button>
                

        </DialogActions>
        </div>
       </div>
        
      </Dialog>*/}