import React from "react";
import TemplateSelector from "./templateSelector"
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
  const [title, setTitle] = React.useState("");
  const [uValue, setUValue] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [manufacturer, setManufacturer] = React.useState("");
  const [serialNumber, setSerialNumber] = React.useState("");
  const [productionYear, setProductionYear] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  //if construction saved successfully, close form
  const saveConstructionClicked = (data) => {
    console.log("Construction saved", data);
    resetValues();
    setOpen(false);
    props.callbackFromParent();
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
    console.log(title)

  };
  //close form
  const handleClose = () => {
    resetValues();
    setOpen(false);
  }

  //reset state refered to all TextField values and errorMessage
  const resetValues = () => {
    setTitle("");
    setManufacturer("");
    setUValue(0);
    setPrice(0);
    setSerialNumber("");
    setProductionYear(0);
    setErrorMessage("");
  }

  //use data from selected template
  const templateCallback = (dataFromChild) => {
    console.log(props.constructionTypeTitle, "template used (", dataFromChild.id, ")");
    setTitle(dataFromChild.title);
    if(!dataFromChild.title)setTitle("");
    setManufacturer(dataFromChild.manufacturer);
    if(!dataFromChild.manufacturer)setManufacturer("");
    setUValue(dataFromChild.uValue);
    if(!dataFromChild.uValue)setUValue(0);
    setPrice(dataFromChild.price);
    if(!dataFromChild.price)setPrice(0);
    setSerialNumber(dataFromChild.serialNumber);
    if(!dataFromChild.serialNumber)setSerialNumber("");
    setProductionYear(dataFromChild.productionYear);
    if(!dataFromChild.productionYear)setProductionYear(0);
    setErrorMessage("");
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
                To add a new {props.constructionTypeTitle} please fill in the values or use a template.
              </DialogContentText>
              <TemplateSelector typeId={typeId} callbackFromParent={templateCallback} key={typeId}></TemplateSelector>
            <div className="addConstructionContent">
              <div>
                <TextField
                  autoFocus
                  id="outlined-basic-title"
                  className="addBuildField"
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <TextField
                  id="outlined-basic-manufacture"
                  className="addBuildField"
                  label="Manufacturer"
                  margin="normal"
                  variant="outlined"
                  value={manufacturer}
                  onChange={e => setManufacturer(e.target.value)}
                />
                <TextField
                  id="outlined-basic-uvalue"
                  className="addBuildField"
                  label="U-Value"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  value={uValue}
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
                  value={price}
                  onChange={e => setPrice(parseFloat(e.target.value))}
                />
                <TextField
                  id="outlined-basic-amount"
                  className="addBuildField"
                  label="Serial number"
                  margin="normal"
                  variant="outlined"
                  value={serialNumber}
                  onChange={e => setSerialNumber(e.target.value)}
                />
                <TextField
                  id="outlined-basic-prodyear"
                  className="addBuildField"
                  label="Production Year"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  value={productionYear}
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