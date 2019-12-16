import React, { Component } from "react";
import "../../styles/addConstruction.scss";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";


export default function EditConstruction({ parentState }) {

  const [open, setOpen] = React.useState(false);
  const [editingDisabled] = React.useState((window.location.pathname == "/result"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  }


  return (
    <div>
      <Button className="conEdit" variant="outlined" disabled={editingDisabled} onClick={handleClickOpen}>
        <EditIcon /> &nbsp; Edit
          </Button>

      <Dialog
        fullWidth="md"
        maxWidth="md"
        minWidth="md"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

        <div className="addConstructionDialog">
          <DialogTitle id="form-dialog-title"> Edit {parentState.type}

          </DialogTitle>
          <DialogContent >

            <DialogContentText>
              To edit {parentState.type} please change at least one of the following values.
          </DialogContentText>
            <div className="addConstructionContent">
              <div>  <TextField
                autoFocus
                id="outlined-basic-title"
                className="addBuildField"
                label="Title"
                margin="normal"
                variant="outlined"
                value={parentState.title}

              />
                <TextField
                  id="outlined-basic-manufacture"
                  className="addBuildField"
                  label="Manufacture"
                  margin="normal"
                  variant="outlined"
                  value={parentState.manufacture}
                />
                <TextField
                  id="outlined-basic-uvalue"
                  className="addBuildField"
                  label="U-Value"
                  margin="normal"
                  variant="outlined"
                  value={parentState.u_value}

                /></div>
              <div>


                <TextField
                  id="outlined-basic-area"
                  className="addBuildField"
                  label="Area"
                  margin="normal"
                  variant="outlined"
                  value={parentState.area}

                />
                <TextField
                  id="outlined-basic-amount"
                  className="addBuildField"
                  label="Amount"
                  margin="normal"
                  variant="outlined"
                  value={parentState.amount}

                />
                <TextField
                  id="outlined-basic-prodyear"
                  className="addBuildField"
                  label="Production Year"
                  margin="normal"
                  variant="outlined"
                  value={parentState.production_year}

                />
              </div>
            </div>


          </DialogContent>
          <DialogActions className="constructionActions">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose} className="saveConstructionButton"

            >
              Save Changes
                </Button>

            <Button onClick={handleClose} color="primary" className="closeButton">
              Close
          </Button>


          </DialogActions>
        </div>


      </Dialog>
    </div>
  );
}