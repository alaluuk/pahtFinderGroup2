import React from "react";
import GraphQLClient from '../../providers/graphql';
import { AppToaster } from '../../App';
import { Button, Intent, Dialog, Classes, FormGroup, InputGroup } from "@blueprintjs/core";

class StructureTypeEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      isLoading: false,
      values: props.structureType, // {},
      errors: {}
    };

    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.isOpen) state.isOpen = props.isOpen;
    return state;
  }

  reset() {
    this.setState({
      isLoading: false,
      values: this.props.structureType, // {},
      errors: {}
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, errors: {} });
      GraphQLClient.request(`
      mutation($id: ID!, $title: String!) {
        updateStructureType(
          id: $id,
          title: $title
        ) {
          id
          title
          createdAt
          updatedAt
        }
      }
    `, this.state.values)
        .then(data => {
          if(this.props.onEdited) this.props.onEdited(data.updateStructureType);
          AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Saved changes to \""+data.updateStructureType.title+"\"!" });
          resolve(data);
        })
        .catch(err => {
          let msg = (err.response) ? err.response.errors[0].message : err.message;
          let errors = {};
          if(err.response) {
            err.response.errors.forEach(error => {
              if(error.message.includes("title")) errors.title = error.message;
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
        className="StructureTypeEditModal Modal"
        icon="new-layer"
        onOpening={this.reset}
        onClose={this.props.onClose || undefined}
        title="Edit Structure Type"
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
                id="title"
                value={this.state.values.title || ""}
                placeholder="Title"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, title: e.target.value}}) }}
                intent={this.state.errors.title ? Intent.DANGER : Intent.NONE }
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
            >Submit Type</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default StructureTypeEditModal;