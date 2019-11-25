import React from "react";
import { Button, Intent, Dialog, Classes, Colors } from "@blueprintjs/core";
import "./styles.scss";

class UserDeleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      handleClose: props.handleClose || undefined,
      handleDeleted: props.handleDeleted || undefined,
      user: props.user || null
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      isOpen: props.isOpen || false,
      handleClose: props.handleClose || undefined,
      handleDeleted: props.handleDeleted || undefined,
      user: props.user || null
    };
  }

  render() {
    return (
      <Dialog
        className="UserDeleteModal"
        icon="blocked-person"
        onClose={this.state.handleClose}
        title={'Confirm deletion of "'+this.props.user.name+'"'}
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            Are you sure you want to delete the user "{this.props.user.name}" ({this.props.user.email}) permanently?
            <br/><br/>
            <strong style={{ color: Colors.RED4 }}>Warning: </strong> If the user owns houses, these get removed too.
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.state.handleClose}>Cancel</Button>
            <Button onClick={this.state.handleDeleted} intent={Intent.DANGER}>
              Delete user
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserDeleteModal;