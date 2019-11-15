import React from "react";
import UserDeleteModal from "../../modals/user-delete";
import { rolesFormatter } from "../../providers/auth";
import { Card, Tag, H5, Button, Elevation, Popover, Position, Menu, Intent, Icon } from "@blueprintjs/core";
import "./styles.scss";

class UserCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserDeleteModalOpen: false
    };
  }

  render() {
    return (
      <Card className="UserCard" elevation={Elevation.ONE}>
        <div className="UserCardAvatarWrapper">
          <Icon icon="person" iconSize={32} />
        </div>
        <div className="UserCardInfoWrapper">
          <H5>{this.props.user.name}</H5>
          <Tag className={"role-tag-"+this.props.user.role} minimal={true}>{rolesFormatter(this.props.user.role)}</Tag>
        </div>
        <div className="UserCardActionWrapper">
          <Popover content={
            <Menu>
              <Menu.Item
                icon="edit" 
                text="Edit user"
              />
              <Menu.Divider />
              <Menu.Item
                icon="trash" 
                text="Delete user"
                intent={Intent.DANGER}
                onClick={() => { this.setState({ isUserDeleteModalOpen: true }) }}
              />
            </Menu>
          } position={Position.RIGHT_TOP}>
            <Button icon="more" minimal="true"></Button>
          </Popover>
        </div>
        <UserDeleteModal
          user={this.props.user}
          isOpen={this.state.isUserDeleteModalOpen}
          handleOpen={() => { this.setState({ isUserDeleteModalOpen: true }) }}
          handleClose={() => { this.setState({ isUserDeleteModalOpen: false }) }}
        />
      </Card>
    );
  }
}

export default UserCardComponent;