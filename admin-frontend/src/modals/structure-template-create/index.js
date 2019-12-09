import React from "react";
import GraphQLClient from '../../providers/graphql';
import { AppToaster } from '../../App';
import { Button, Intent, Dialog, Classes, FormGroup, InputGroup, NumericInput, HTMLSelect } from "@blueprintjs/core";
import "./styles.scss";

class StructureTemplateCreateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      isLoading: false,
      values: {
        typeId: props.selectedStructureTypeId || ""
      },
      errors: {},
      typesList: [ { label: "Choose an item...", value: "" } ]
    };

    if(props.structureTypes) {
      props.structureTypes.forEach(structureType => {
        this.state.typesList.push({ label: structureType.title, value: structureType.id });
      });
    }

    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.isOpen) state.isOpen = props.isOpen;
    if(props.selectedStructureTypeId) state.values.typeId = props.selectedStructureTypeId || "";
    if(props.structureTypes) {
      state.typesList = [ { label: "Choose an item...", value: "" } ];
      props.structureTypes.forEach(structureType => {
        state.typesList.push({ label: structureType.title, value: structureType.id });
      });
    }

    return state;
  }

  reset() {
    this.setState({
      isLoading: false,
      values: {
        typeId: ""
      },
      errors: {}
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, errors: {} });
      GraphQLClient.request(`
      mutation($title: String!, $typeId: ID!, $uValue: Float!, $price: Float, $manufacturer: String, $serialNumber: String, $productionYear: Int) {
        createStructureTemplate(
          title: $title,
          typeId: $typeId,
          uValue: $uValue,
          price: $price,
          manufacturer: $manufacturer,
          serialNumber: $serialNumber,
          productionYear: $productionYear
        ) {
          id
          title
          type {
            id
          }
          uValue
          price
          manufacturer
          serialNumber
          productionYear
          createdAt
          updatedAt
        }
      }
    `, this.state.values)
        .then(data => {
          if(this.props.onCreated) this.props.onCreated(data.createStructureTemplate);
          AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Successfully added structure template \""+data.createStructureTemplate.title+"\"!" });
          resolve(data);
        })
        .catch(err => {
          let msg = (err.response) ? err.response.errors[0].message : err.message;
          let errors = {};
          if(err.response) {
            err.response.errors.forEach(error => {
              if(error.message.includes("typeId")) errors.typeId = error.message;
              if(error.message.includes("title")) errors.title = error.message;
              if(error.message.includes("uValue")) errors.uValue = error.message;
              if(error.message.includes("price")) errors.price = error.message;
              if(error.message.includes("manufacturer")) errors.manufacturer = error.message;
              if(error.message.includes("serialNumber")) errors.serialNumber = error.message;
              if(error.message.includes("productionYear")) errors.productionYear = error.message;
            });
          }
          this.setState({ errors: errors });
          if(Object.keys(errors).length === 0) AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: msg });
          // reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    return (
      <Dialog
        className="StructureTemplateCreateModal Modal"
        icon="new-layers"
        onOpening={this.reset}
        onClose={this.props.onClose || undefined}
        title="New Structure Template"
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              label="Structure Type"
              labelFor="type"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.typeId}
              intent={this.state.errors.typeId ? Intent.DANGER : Intent.NONE }
            >
              <HTMLSelect
                id="type"
                options={this.state.typesList}
                value={this.state.values.typeId || undefined}
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, typeId: e.target.value}}) }}
                intent={this.state.errors.typeId ? Intent.DANGER : Intent.NONE }
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="Title"
              labelFor="title"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.title}
              intent={this.state.errors.title ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="title"
                value={this.state.values.title || ""}
                placeholder="Title"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, title: e.target.value}}) }}
                intent={this.state.errors.title ? Intent.DANGER : Intent.NONE }
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="U-Value"
              labelFor="uValue"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.uValue}
              intent={this.state.errors.uValue ? Intent.DANGER : Intent.NONE }
              className="grid-l-half"
            >
              <NumericInput
                id="uValue"
                value={this.state.values.uValue || ""}
                placeholder="U-Value"
                disabled={this.state.isLoading}
                onValueChange={(value) => { this.setState({values: {...this.state.values, uValue: value}}) }}
                intent={this.state.errors.uValue ? Intent.DANGER : Intent.NONE }
                majorStepSize={1}
                stepSize={0.1}
                minorStepSize={0.01}
                min={0}
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="Price (€)"
              labelFor="price"
              disabled={this.state.isLoading}
              helperText={this.state.errors.price}
              intent={this.state.errors.price ? Intent.DANGER : Intent.NONE }
              className="grid-l-half"
            >
              <NumericInput
                id="price"
                value={this.state.values.price || ""}
                placeholder="Price (€)"
                disabled={this.state.isLoading}
                onValueChange={(value) => { this.setState({values: {...this.state.values, price: value}}) }}
                intent={this.state.errors.price ? Intent.DANGER : Intent.NONE }
                min={0}
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="Manufacturer"
              labelFor="manufacturer"
              disabled={this.state.isLoading}
              helperText={this.state.errors.manufacturer}
              intent={this.state.errors.manufacturer ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="manufacturer"
                value={this.state.values.manufacturer || ""}
                placeholder="Manufacturer"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, manufacturer: e.target.value}}) }}
                intent={this.state.errors.manufacturer ? Intent.DANGER : Intent.NONE }
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="Serial Number"
              labelFor="serialNumber"
              disabled={this.state.isLoading}
              helperText={this.state.errors.serialNumber}
              intent={this.state.errors.serialNumber ? Intent.DANGER : Intent.NONE }
              className="grid-l-half"
            >
              <InputGroup
                id="serialNumber"
                value={this.state.values.serialNumber || ""}
                placeholder="Serial Number"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, serialNumber: e.target.value}}) }}
                intent={this.state.errors.serialNumber ? Intent.DANGER : Intent.NONE }
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="Production Year"
              labelFor="productionYear"
              disabled={this.state.isLoading}
              helperText={this.state.errors.productionYear}
              intent={this.state.errors.productionYear ? Intent.DANGER : Intent.NONE }
              className="grid-l-half"
            >
              <NumericInput
                id="productionYear"
                value={this.state.values.productionYear || ""}
                placeholder="Production Year"
                disabled={this.state.isLoading}
                onValueChange={(value) => { this.setState({values: {...this.state.values, productionYear: value}}) }}
                intent={this.state.errors.productionYear ? Intent.DANGER : Intent.NONE }
                min={0}
                max={new Date().getFullYear()}
                stepSize={1}
                clampValueOnBlur={true}
                fill={true}
              />
            </FormGroup>
          </form>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={this.props.onClose || undefined}
              disabled={this.state.isLoading}
            >Cancel</Button>
            <Button
              intent={Intent.SUCCESS}
              onClick={this.handleSubmit}
              loading={this.state.isLoading}
            >Submit Template</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default StructureTemplateCreateModal;