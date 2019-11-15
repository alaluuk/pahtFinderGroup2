import React from "react";
import { Button, Intent, Dialog, Classes } from "@blueprintjs/core";
import "./styles.scss";

class UserCreateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      handleOpen: props.handleOpen || undefined,
      handleClose: props.handleClose || undefined
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      isOpen: props.isOpen || false,
      handleOpen: props.handleOpen || undefined,
      handleClose: props.handleClose || undefined
    };
  }

  render() {
    return (
      <Dialog
        className="UserCreateModal"
        icon="new-person"
        onClose={this.state.handleClose}
        title="Add new user"
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            Data integration is the seminal problem of the digital age. For over ten years, we’ve
            helped the world’s premier organizations rise to the challenge.
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.state.handleClose}>Cancel</Button>
            <Button intent={Intent.SUCCESS}>
              Save changes
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserCreateModal;