import React, { Component } from "react";
import "../../styles/addConstruction.scss";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddConstruction ({ type }){

 

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="addNewPlusButton"
        variant="outlined"
        onClick={handleClickOpen}
      >
        + Add New
      </Button>

      <Dialog 
      fullWidth="md"
      maxWidth="md"
      minWidth="md"
      open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
        <div className = "addConstructionDialog">
        <DialogTitle id="form-dialog-title"> Add A New {type} 
        
        </DialogTitle>
        <DialogContent >
        
          <DialogContentText>
            To add a new {type} please fill in the following values.
          </DialogContentText>
          <div className = "addConstructionContent"> 
          <div>  <TextField
                  autoFocus
                    id="outlined-basic"
                    className="addBuildField"
                    label="Title"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Manufacture"
                    margin="normal"
                    variant="outlined"
                  />
                    <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="U-Value"
                    margin="normal"
                    variant="outlined"
                  /></div>
          <div>
          <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Are"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Amount"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Production Year"
                    margin="normal"
                    variant="outlined"
                  />
          </div>
              </div>
        

        </DialogContent>
        <DialogActions className = "constructionActions">
          <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}  className = "saveConstructionButton"
                  
                >
                  Save New {type}
                </Button>

                <Button onClick={handleClose} color="primary" className = "closeButton">
            Close
          </Button>
                

        </DialogActions>
        </div>
       
        
      </Dialog>
    </div>
  );
}