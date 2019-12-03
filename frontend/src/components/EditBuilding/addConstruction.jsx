import React, { Component } from "react";
import "../../styles/addConstruction.scss";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Structure from '../../objects/structure.js'


export default function AddConstruction ({ parentType, parentState }){

 
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
    }


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
        <DialogTitle id="form-dialog-title"> Add A New {parentType} 
        
        </DialogTitle>
        <DialogContent >
        
          <DialogContentText>
            To add a new {parentType} please fill in the following values.
          </DialogContentText>
          <div className = "addConstructionContent"> 
          <div>  <TextField
                  autoFocus
                    id="outlined-basic-title"
                    className="addBuildField"
                    label="Title"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic-manufacture"
                    className="addBuildField"
                    label="Manufacture"
                    margin="normal"
                    variant="outlined"
                  />
                    <TextField
                    id="outlined-basic-uvalue"
                    className="addBuildField"
                    label="U-Value"
                    margin="normal"
                    variant="outlined"
                  /></div>
          <div>
          <TextField
                    id="outlined-basic-area"
                    className="addBuildField"
                    label="Area"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic-amount"
                    className="addBuildField"
                    label="Amount"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic-prodyear"
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
                  Save New {parentType}
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