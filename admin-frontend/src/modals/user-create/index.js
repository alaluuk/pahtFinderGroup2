import React from "react";
import { Button, Intent, Dialog, Classes } from "@blueprintjs/core";
import "./styles.scss";

class UserCreateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      isOpen: props.isOpen || false
    };
  }

  render() {
    return (
      <Dialog
        className="UserCreateModal Modal"
        icon="new-person"
        onClose={this.props.onClose || undefined}
        title="New User"
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
            <Button onClick={this.props.onClose || undefined}>Cancel</Button>
            <Button intent={Intent.SUCCESS}>Submit User</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserCreateModal;