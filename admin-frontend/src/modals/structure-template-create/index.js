import React from "react";
import { Button, Intent, Dialog, Classes, FormGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import "./styles.scss";

class StructureTemplateCreateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      isLoading: false,
      values: {},
      errors: {}
    };

    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      isOpen: props.isOpen || false
    };
  }

  reset() {
    this.setState({
      isLoading: false,
      values: {},
      errors: {}
    });
  }

  handleSubmit() {
    this.setState({ isLoading: true, errors: {} });
  }

  render() {
    return (
      <Dialog
        className="StructureTemplateCreateModal Modal"
        icon="new-layers"
        onOpening={this.reset}
        onClose={this.props.handleClose || undefined}
        title="New Structure Template"
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              label="Title"
              labelFor="title"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.title}
              intent={this.state.errors.title ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
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
              label="Area (m²)"
              labelFor="area"
              disabled={this.state.isLoading}
              helperText={this.state.errors.area}
              intent={this.state.errors.area ? Intent.DANGER : Intent.NONE }
              className="grid-l-half"
            >
              <NumericInput
                value={this.state.values.area || ""}
                placeholder="Area (m²)"
                disabled={this.state.isLoading}
                onValueChange={(value) => { this.setState({values: {...this.state.values, area: value}}) }}
                intent={this.state.errors.area ? Intent.DANGER : Intent.NONE }
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
              onClick={this.props.handleClose || undefined}
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