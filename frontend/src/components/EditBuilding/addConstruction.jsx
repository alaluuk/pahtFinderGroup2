import React, { useEffect } from "react";
import "../../styles/addConstruction.scss";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography';
import { Mutation } from 'react-apollo'




export default function AddConstruction(props) {
  
  const HOUSE_STRUCTURE_CREATE = gql`
  mutation createHouseStructure($houseId: ID!, $title: String!, $typeId: ID!, $uValue: Float!, $price: Float!, $manufacturer: String!, $serialNumber: String!, $productionYear: Int!) {
    createHouseStructure(houseId: $houseId, title: $title, typeId: $typeId, uValue: $uValue, price: $price, manufacturer: $manufacturer, serialNumber: $serialNumber, productionYear: $productionYear) {
      id
    }
  }
`
  //State in hook
  const [houseId] = React.useState(() => {
    return props.houseId;
  });
  const [typeId] = React.useState(() => {
    return props.constructionTypeId;
  });
  const [title, setTitle] = React.useState();
  const [uValue, setUValue] = React.useState();
  const [price, setPrice] = React.useState();
  const [manufacturer, setManufacturer] = React.useState();
  const [serialNumber, setSerialNumber] = React.useState();
  const [productionYear, setProductionYear] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();
  const [open, setOpen] = React.useState(false);
  //if construction saved successfully, close form
  const saveConstructionClicked = (data) => {
    console.log("Construction saved", data)
    setOpen(false);
  };
  //Write best available error message
  const handleErrors = (data) => {
    console.log("Construction saving failed", data)
    if (data.graphQLErrors[0]) {
      setErrorMessage(data.graphQLErrors[0].message)
    } else {
      setErrorMessage((props.constructionTypeTitle + " could not be saved." + 
      " Please fill out every field and check your internet connection."))
    }
  };
  //open form
  const handleClickOpen = () => {
    setOpen(true);
  };
  //close form
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

        <div className="addConstructionDialog">
          <DialogTitle id="form-dialog-title">
            Add A New {props.constructionTypeTitle}
          </DialogTitle>

          <DialogContent >
            <DialogContentText>
              To add a new {props.constructionTypeTitle} please fill in the following values.
          </DialogContentText>
            <div className="addConstructionContent">
              <div>
                <TextField
                  autoFocus
                  id="outlined-basic-title"
                  className="addBuildField"
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  onChange={e => setTitle(e.target.value)}
                />
                <TextField
                  id="outlined-basic-manufacture"
                  className="addBuildField"
                  label="Manufacture"
                  margin="normal"
                  variant="outlined"
                  onChange={e => setManufacturer(e.target.value)}
                />
                <TextField
                  id="outlined-basic-uvalue"
                  className="addBuildField"
                  label="U-Value"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onChange={e => setUValue(parseFloat(e.target.value))}
                /></div>
              <div>
                <TextField
                  id="outlined-basic-area"
                  className="addBuildField"
                  label="Price"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onChange={e => setPrice(parseFloat(e.target.value))}
                />
                <TextField
                  id="outlined-basic-amount"
                  className="addBuildField"
                  label="Serial number"
                  margin="normal"
                  variant="outlined"
                  onChange={e => setSerialNumber(e.target.value)}
                />
                <TextField
                  id="outlined-basic-prodyear"
                  className="addBuildField"
                  label="Production Year"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onChange={e => setProductionYear(parseInt(e.target.value))}
                />
              </div>
            </div>
            <Typography variant="subtitle1" component="p" style={{ color: 'red' }} >
              {errorMessage}
            </Typography>
          </DialogContent>
          <DialogActions className="constructionActions">

            <Mutation
              mutation={HOUSE_STRUCTURE_CREATE}
              variables={{ houseId, title, typeId, uValue, price, manufacturer, serialNumber, productionYear }}
              onCompleted={data => saveConstructionClicked(data)}
              onError={data => handleErrors(data)}
              onWarning={data => handleErrors(data)}
            >

              {mutation => (
                <Button
                  variant="contained"
                  color="primary"
                  className="saveConstructionButton"
                  onClick={mutation}
                >
                  Save New {props.constructionTypeTitle}
                </Button>
              )}

            </Mutation>


            <Button onClick={handleClose} color="primary" className="closeButton">
              Close
          </Button>


          </DialogActions>
        </div>


      </Dialog>
    </div>
  );
}